import axios from "axios"
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
    
    const [showData, setShowData] = useState([]);
    const [token, setToken] = useState(initialToken)
    const userIsLoggedIn = !!token;
    const loginHandler =async (token,expirationTime) => {
        setToken(token);
        localStorage.setItem("token", token);
        let emailId = localStorage.getItem("email").replace(/[@.]/g,"_")
        localStorage.setItem("expirationTime", expirationTime)
        let get = await axios.get(`https://crudcrud.com/api/7b295782952646a7a42f65e5e639e51c/${emailId}`)
        setShowData(get.data)
     const remainingTime=   calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }
    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem("token")
        localStorage.removeItem("expirationTime")
        
        if (logoutTimer) {
        
            clearTimeout(logoutTimer);
        }
        window.location.reload()
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
        logout: logoutHandler,
        showData: showData,
        setShowData:setShowData
     }
    return <AuthContext.Provider value={contextValue}>
    {children}
    
    </AuthContext.Provider>
}



//  const [showData, setShowData] = useState([]);
//  useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let res = await axios.get(
//           "https://crudcrud.com/api/7b295782952646a7a42f65e5e639e51c/data"
//         );
//         setShowData(res.data);
//       } catch (error) {
//         console.log("Error while fetching data", error);
//       }
//     };

//     fetchData();
//   }, []);