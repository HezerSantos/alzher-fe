import React, { ReactNode, useCallback, useContext, useState } from "react"
import AuthContext from "./authContext"
import api from "../../app.config"
import CsrfContext from "../csrf/csrfContext"
import axios, { AxiosError } from "axios"
import handleApiError from "../../app.config.error"

interface AuthProviderProps {
    children: ReactNode
}


type RefreshType = () => Promise<boolean | void>



const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const csrfContext = useContext(CsrfContext)
    const [ isAuthState, setIsAuthState ] = useState({isAuth: false, isAuthLoading: true})

    const logout = useCallback(() => {
        setIsAuthState({isAuth: false, isAuthLoading: false})
    }, [])


    const refresh: RefreshType = useCallback(async () => {
        try {
            setIsAuthState({isAuth: false, isAuthLoading: true})
            const newCsrf = await csrfContext?.getCsrf()
            await api.get("/api/auth/secure/refresh", {
                headers: {
                    csrftoken: newCsrf
                }
            });
            setIsAuthState({isAuth: true, isAuthLoading: false})
            return true
        } catch (error) {
            const axiosError = error as AxiosError
            const res = axiosError.response?.data as ApiErrorType
            setIsAuthState({isAuth: false, isAuthLoading: false})
            if(res.code === "INVALID_ACCESS_TOKEN"){
                console.log('hello')
                return false
            }
            //SIDE NOTE: I PROBABLY HAD TO RETURN THE ERROR HELPER AND STATE THE RETURN VALUE SO THAT THERE IS A RETURN VALUE FOR REFRESH
            /*return*/handleApiError({
                axiosError: axiosError,
                status: axiosError.status,
                csrfContext: csrfContext,
                authContext: { refresh, isAuthState, setIsAuthState, logout },
                callbacks: {
                    handlePublicAuthRetry: () => refresh(),
                    handleCsrfRetry: () => {}
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