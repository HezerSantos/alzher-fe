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
    isAuth: boolean,
    setIsAuth: React.Dispatch<SetStateAction<boolean>>,
    refresh: (retry: boolean, newCsrf?: string | null) => void,
    isAuthLoading: boolean,
    setIsAuthLoading: React.Dispatch<SetStateAction<boolean>>
}

const fetchDashboardData: FetchDashboardDataType = async(csrfContext, authContext, setData, path, retry, newCsrf) => {
    try{
        const res = await api.get(`/api/dashboard/${path}`, {
            headers: {
                csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
            }
        })
        console.log(res)
        authContext?.setIsAuth(true)
    } catch(error) {
        const axiosError = error as AxiosError
        console.log(axiosError)
        handleRequestError(axiosError, csrfContext, axiosError.status, retry, 
            [
                () => fetchDashboardData(csrfContext, authContext, setData, path, true),
                (newCsrf: string) => fetchDashboardData(csrfContext, authContext, setData, path, false, newCsrf)
            ],
            [],
            authContext
        )
    } finally {
        authContext?.setIsAuthLoading(false)
    }
}

export default fetchDashboardData