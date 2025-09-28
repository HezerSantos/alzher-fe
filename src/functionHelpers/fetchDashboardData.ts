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
        console.error(error)
        const axiosError = error as AxiosError
        handleRequestError(axiosError, csrfContext, axiosError.status, retry, 
            [
                () => fetchDashboardData(csrfContext, authContext, setData, path, true, body, null, setIsLoading),
                (newCsrf: string) => fetchDashboardData(csrfContext, authContext, setData, path, false, body, newCsrf, setIsLoading),
                () => fetchDashboardData(csrfContext, authContext, setData, path, true, body, null, setIsLoading),
            ],
            [],
            authContext
        )
    } finally {
        if(setIsLoading){
            setIsLoading(false)
        }
    }
}

export default fetchDashboardData