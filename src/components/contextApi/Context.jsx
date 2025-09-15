import { createContext, useState } from "react"

export const LoginContext = createContext()

export const ContextProvider = ({ children }) => {
    let [isLogin, setIsLogin] = useState(false);
    return <LoginContext.Provider value={{isLogin,setIsLogin}}>
    {children}
    </LoginContext.Provider>
}