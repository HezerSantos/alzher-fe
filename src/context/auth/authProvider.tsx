import React, { ReactNode, useCallback, useContext, useState } from "react"
import AuthContext from "./authContext"
import api from "../../app.config"
import CsrfContext from "../csrf/csrfContext"
import { AxiosError } from "axios"
import handleRequestError from "../../app.config.error"

interface AuthProviderProps {
    children: ReactNode
}


type RefreshType = (retry: boolean, newCsrf?: string | null) => void



const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const csrfContext = useContext(CsrfContext)
    const [ isAuthState, setIsAuthState ] = useState({isAuth: false, isAuthLoading: true})
    const refresh: RefreshType = useCallback(async (retry, newCsrf) => {
        try {
            setIsAuthState({isAuth: false, isAuthLoading: true})
            await api.get("/api/auth/secure/refresh", {
                headers: {
                    csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
                }
            });
            setIsAuthState({isAuth: true, isAuthLoading: false})
        } catch (error) {
            const axiosError = error as AxiosError
            setIsAuthState({isAuth: false, isAuthLoading: false})
            handleRequestError(axiosError, csrfContext, axiosError.status, retry, 
                [
                    () => refresh(true),
                    (newCsrf: string) => refresh(false, newCsrf)
                ]
            )
        }
    }, []);

    return(
        <AuthContext.Provider value={{refresh, isAuthState, setIsAuthState}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider