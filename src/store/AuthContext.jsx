import { createContext ,useEffect,useState,useCallback} from "react"

export const AuthContext = createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => { },
    logout:()=>{},
})


let logoutTimer;
let retrieveStoreToken = () => {
    const storeToken = localStorage.getItem("token")
    const storeExpirationDate = localStorage.getItem("expirationTime")
    const remainingTime = calculateRemainingTime(storeExpirationDate)
    if (remainingTime <= 3600) {
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        return null;
    }
    return {
        token: storeToken,
        duration:remainingTime,
    }
}
const calculateRemainingTime = (expirationTime) => {

    const currentTime = new Date().getTime()
    const adjExpirationTime = new Date(expirationTime).getTime()
    const remainingDuration = adjExpirationTime - currentTime
    return remainingDuration
}

export const AuthContextProvider = ({ children }) => {
    const tokenData = retrieveStoreToken();
    let initialToken;
    if (initialToken) {
        initialToken = tokenData.token;
        return null;
    }
    
    const [token, setToken] = useState(initialToken)
    const userIsLoggedIn = !!token;
    const loginHandler = (token,expirationTime) => {
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime",expirationTime)
     const remainingTime=   calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }
    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem("token")
        localStorage.removeItem("expirationTime")
        
        if (logoutTimer) {
            console.log(tokenData.duration)
            clearTimeout(logoutTimer);
        }
        
    },[])
    useEffect(() => {
        if (tokenData) {
         logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    },[tokenData,logoutHandler])
    
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout:logoutHandler,
     }
    return <AuthContext.Provider value={contextValue}>
    {children}
    
    </AuthContext.Provider>
}