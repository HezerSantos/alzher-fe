import React, { SetStateAction } from "react"
import api from "../app.config"
import axios, { AxiosError } from "axios"
import handleApiError from "../app.config.error"

type FetchDashboardDataType = (
    csrfContext: CsrfContextType | null,
    authContext: AuthContextType | null,
    setData: React.Dispatch<SetStateAction<any>>,
    path: string,
    retry: boolean,
    body?: any | null,
    newCsrf?: string | null,
    setIsLoading?: React.Dispatch<SetStateAction<boolean>>
) => void


const fetchDashboardData: FetchDashboardDataType = async(csrfContext, authContext, setData, path, retry, body, newCsrf, setIsLoading) => {
    try{
        if(setIsLoading){
            setIsLoading(true)
        }
        const res = await api.get(`/api/dashboard/${path}`, {
            headers: {
                csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
            }, 
            params: body? body : undefined
        })
        authContext?.setIsAuthState({isAuth: true, isAuthLoading: false})
        setData(res.data)
        // console.log(res)
    } catch(error) {
        // console.error(error)
        const axiosError = error as AxiosError
        handleApiError({
            axiosError: axiosError,
            status: axiosError.status,
            csrfContext: csrfContext,
            authContext: authContext,
            callbacks: {
                handlePublicAuthRetry: () => fetchDashboardData(csrfContext, authContext, setData, path, retry, body, null, setIsLoading),
                handleCsrfRetry: (newCsrf) => fetchDashboardData(csrfContext, authContext, setData, path, retry, body, newCsrf, setIsLoading),
                handleSecureAuthRetry: () => fetchDashboardData(csrfContext, authContext, setData, path, retry, body, null, setIsLoading)
            }
        })
    } finally {
        if(setIsLoading){
            setIsLoading(false)
        }
    }
}

export default fetchDashboardData