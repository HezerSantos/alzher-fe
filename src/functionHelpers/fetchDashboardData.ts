import React, { SetStateAction } from "react"
import api from "../app.config"
import { AxiosError } from "axios"
import handleRequestError from "../app.config.error"

type FetchDashboardDataType = (
    csrfContext: CsrfContextType | null,
    authContext: AuthContextType | null,
    setData: React.Dispatch<SetStateAction<any>>,
    path: string,
    retry: boolean,
    newCsrf?: string | null
) => void

interface CsrfContextType {
    csrfToken: string | null
    decodeCookie: (cookie: string) => void
    getCsrf: () => Promise<string | undefined>
}

interface AuthContextType {
    refresh: (retry: boolean, newCsrf?: string | null) => void,
    isAuthState: {isAuth: boolean, isAuthLoading: boolean},
    setIsAuthState: React.Dispatch<SetStateAction<{isAuth: boolean, isAuthLoading: boolean}>>
}


const fetchDashboardData: FetchDashboardDataType = async(csrfContext, authContext, setData, path, retry, newCsrf) => {
    try{
        const res = await api.get(`/api/dashboard/${path}`, {
            headers: {
                csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
            }
        })
        authContext?.setIsAuthState({isAuth: true, isAuthLoading: false})
    } catch(error) {
        const axiosError = error as AxiosError
        handleRequestError(axiosError, csrfContext, axiosError.status, retry, 
            [
                () => fetchDashboardData(csrfContext, authContext, setData, path, true),
                (newCsrf: string) => fetchDashboardData(csrfContext, authContext, setData, path, false, newCsrf)
            ],
            [],
            authContext
        )
    }
}

export default fetchDashboardData