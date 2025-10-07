import React, { ReactNode, useCallback, useContext, useState } from "react"
import AuthContext from "./authContext"
import api from "../../app.config"
import CsrfContext from "../csrf/csrfContext"
import { AxiosError } from "axios"
import handleApiError from "../../app.config.error"
import ErrorContext from "../error/errorContext"

interface AuthProviderProps {
    children: ReactNode
}


type RefreshType = (newCsrf?: string | null) => Promise<boolean | void>



const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const csrfContext = useContext(CsrfContext)
    const errorContext = useContext(ErrorContext)
    const [ isAuthState, setIsAuthState ] = useState({isAuth: false, isAuthLoading: true})

    const logout = useCallback(() => {
        setIsAuthState({isAuth: false, isAuthLoading: false})
    }, [])


    const refresh: RefreshType = useCallback(async (newCsrf) => {
        try {
            setIsAuthState({isAuth: false, isAuthLoading: true})
            await api.get("/api/auth/secure/refresh", {
                headers: {
                    csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
                }
            });
            setIsAuthState({isAuth: true, isAuthLoading: false})
            return true
        } catch (error) {
            const axiosError = error as AxiosError
            setIsAuthState({isAuth: false, isAuthLoading: false})
            //SIDE NOTE: I PROBABLY HAD TO RETURN THE ERROR HELPER AND STATE THE RETURN VALUE SO THAT THERE IS A RETURN VALUE FOR REFRESH
            return handleApiError({
                axiosError: axiosError,
                status: axiosError.status,
                csrfContext: csrfContext,
                errorContext: errorContext,
                authContext: { refresh, isAuthState, setIsAuthState, logout },
                callbacks: {
                    handlePublicAuthRetry: () => refresh(),
                    handleCsrfRetry: (newCsrf) => refresh(newCsrf)
                }
            })
        }
    }, [csrfContext, logout]);


    return(
        <AuthContext.Provider value={{refresh, isAuthState, setIsAuthState, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider