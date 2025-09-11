import React, { SetStateAction } from "react"
import api from "./app.config"
import { AxiosError } from "axios"

interface CsrfContextType {
    csrfToken: string | null
    decodeCookie: (cookie: string) => void
    getCsrf: () => Promise<string | undefined>
}

interface ErrorType {
    msg: string,
    isError: boolean
}

type HandleRequestErrorType  =(
    axiosError: AxiosError,
    csrfContext: CsrfContextType | null,
    status: number | undefined,
    retry: boolean,
    callback: any[],
    setStateErrors: {
                        errorName: string,
                        setState: React.Dispatch<SetStateAction< ErrorType | null>> | undefined
                    }[]
) => void


interface ValidationErrorType {
    type: string,
    value: string,
    msg: string,
    path: string,
    location: string
}
interface CustomErrorType {
    errors: ValidationErrorType[]
}

const handleRequestError: HandleRequestErrorType = async(axiosError, csrfContext, status, retry, callback, setStateErrors) => {
    if(status === 401 ) {
        await api.get(`/api/auth/public`)
        if(retry){
            callback[0]()
        }
        return
    }
    if(status === 403 ) {
        const newCsrf = await csrfContext?.getCsrf()
        if(retry){
            callback[1](newCsrf)
        }
        return
    }
    if(status === 400){
        const data = axiosError.response?.data as CustomErrorType
        const errors = data.errors
        const errorMap = new Map(
            errors.map(error => {
                return [ error.path, error.msg]
            })
        )
        
        setStateErrors.forEach(error => {
            if(errorMap.has(error.errorName)){
                const msg = errorMap.get(error.errorName)
                if(msg && error.setState){
                    error.setState({
                        msg,
                        isError: true
                    })
                }
            } else {
                if(error.setState){
                    error.setState(null)
                }
            }
        })
    }
}

export default handleRequestError