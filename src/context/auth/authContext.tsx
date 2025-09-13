import React, { createContext, SetStateAction } from "react";

interface AuthContextType {
    refresh: (retry: boolean, newCsrf?: string | null) => void,
    isAuthState: {isAuth: boolean, isAuthLoading: boolean},
    setIsAuthState: React.Dispatch<SetStateAction<{isAuth: boolean, isAuthLoading: boolean}>>
}



const AuthContext = createContext<AuthContextType | null>(null)


export default AuthContext