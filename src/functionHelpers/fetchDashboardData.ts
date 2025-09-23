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
    body?: any | null,
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


const fetchDashboardData: FetchDashboardDataType = async(csrfContext, authContext, setData, path, retry, body, newCsrf) => {
    try{
        const res = await api.get(`/api/dashboard/${path}`, {
            headers: {
                csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
            }, 
            params: body
        })
        authContext?.setIsAuthState({isAuth: true, isAuthLoading: false})
        setData(res.data)
    } catch(error) {
        console.error(error)
        const axiosError = error as AxiosError
        handleRequestError(axiosError, csrfContext, axiosError.status, retry, 
            [
                () => fetchDashboardData(csrfContext, authContext, setData, path, true, body),
                (newCsrf: string) => fetchDashboardData(csrfContext, authContext, setData, path, false, body, newCsrf),
                () => fetchDashboardData(csrfContext, authContext, setData, path, true, body),
            ],
            [],
            authContext
        )
    }
}

export default fetchDashboardData