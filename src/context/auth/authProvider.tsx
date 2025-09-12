import React, { ReactNode, SetStateAction, useState } from "react"
import AuthContext from "./authContext"

interface AuthProviderProps {
    children: ReactNode
}



const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {

    const [ isAuth, setIsAuth ] = useState(false)
    return(
        <AuthContext.Provider value={{isAuth, setIsAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider