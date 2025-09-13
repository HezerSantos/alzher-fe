import React, { ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from "react"
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
    const [ isAuth, setIsAuth ] = useState(false)
    const [ isAuthLoading, setIsAuthLoading ] = useState(true)

    const refresh: RefreshType = useCallback(async (retry, newCsrf) => {
        try {
            setIsAuthLoading(true)
            const res = await api.get("/api/auth/secure/refresh", {
                headers: {
                    csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
                }
            });
            console.log(res)
            setIsAuth(true)
        } catch (error) {
            const axiosError = error as AxiosError
            setIsAuth(false)
            handleRequestError(axiosError, csrfContext, axiosError.status, retry, 
                [
                    () => refresh(true),
                    (newCsrf: string) => refresh(false, newCsrf)
                ]
            )
        } finally {
            setIsAuthLoading(false)
        }
    }, []);

    return(
        <AuthContext.Provider value={{isAuth, setIsAuth, refresh, isAuthLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider