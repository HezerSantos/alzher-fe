import React, { SetStateAction } from "react"
import api from "../app.config"
import { AxiosError } from "axios"
import handleApiError from "../app.config.error"

type FetchDashboardDataType = (
    globalContext: GlobalContextType,
    setData: React.Dispatch<SetStateAction<any>>,
    path: string,
    body?: any | null,
    newCsrf?: string | null,
    setIsLoading?: React.Dispatch<SetStateAction<boolean>>
) => void


const fetchDashboardData: FetchDashboardDataType = async(globalContext, setData, path, body, newCsrf, setIsLoading) => {
    try{
        if(setIsLoading){
            setIsLoading(true)
        }
        const res = await api.get(`/api/dashboard/${path}`, {
            headers: {
                csrftoken: newCsrf? newCsrf : globalContext.csrf?.csrfToken
            }, 
            params: body? body : undefined
        })
        globalContext.auth?.setIsAuthState({isAuth: true, isAuthLoading: false})
        setData(res.data)
        // console.log(res)
        if(setIsLoading){
            setIsLoading(false)
        }
    } catch(error) {
        // console.error(error)
        const axiosError = error as AxiosError
        handleApiError({
            axiosError: axiosError,
            status: axiosError.status,
            globalContext: globalContext,
            callbacks: {
                handlePublicAuthRetry: () => fetchDashboardData(globalContext, setData, path, body, null, setIsLoading),
                handleCsrfRetry: (newCsrf) => fetchDashboardData(globalContext, setData, path, body, newCsrf, setIsLoading),
                handleSecureAuthRetry: () => fetchDashboardData(globalContext, setData, path, body, null, setIsLoading)
            }
        })
    } finally {
        // if(setIsLoading){
        //     setIsLoading(false)
        // }
    }
}

export default fetchDashboardData