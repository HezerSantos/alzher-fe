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
    setStateErrors?: {
                        errorName: string,
                        setState?: React.Dispatch<SetStateAction< ErrorType | null >> | undefined,
                        setMsgError?: React.Dispatch<SetStateAction<boolean>>
                    }[],
    authContext?: AuthContextType | null
) => void

interface AuthContextType {
    refresh: (retry: boolean, newCsrf?: string | null) => void,
    isAuthState: {isAuth: boolean, isAuthLoading: boolean},
    setIsAuthState: React.Dispatch<SetStateAction<{isAuth: boolean, isAuthLoading: boolean}>>
}

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

interface UnauthorizedError {
    errors: {
        msg: string,
        code: string
    }
}

const handleRequestError: HandleRequestErrorType = async(axiosError, csrfContext, status, retry, callback, setStateErrors, authContext) => {
    if(status === 401 ) {
        const res = axiosError.response?.data as UnauthorizedError
        if(res.errors.code === "AUTH_INVALID_CREDENTIALS"){
            setStateErrors?.forEach(error => {
                if(error.setState){
                    error.setState({
                        msg: "Invalid Username or Password",
                        isError: true
                    })
                }
            })
            return
        }

        if(res.errors.code === "AUTH_INVALID_TOKEN"){
            return
        }

        if(res.errors.code === "INVALID_ACCESS_TOKEN"){
            await authContext?.refresh(true)
            if(callback[2]){
                await callback[2]()
            }
            return
        }
        
        if(retry){
            await api.get(`/api/auth/public`)
            await callback[0]()
        }
        return
    }
    if(status === 403 ) {
        const newCsrf = await csrfContext?.getCsrf()
        if(retry){
            await callback[1](newCsrf)
        }
        return
    }
    if(status === 400){
        const res = axiosError.response?.data as UnauthorizedError
        if(res.errors.code === "INVALID_PROCESS"){
            setStateErrors?.forEach(error => {
                if(error.setMsgError){
                    error.setMsgError(true)
                }
            })
            return
        }

        const data = axiosError.response?.data as CustomErrorType
        const errors = data.errors
        const errorMap = new Map(
            errors.map(error => {
                return [ error.path, error.msg]
            })
        )
        setStateErrors?.forEach(error => {
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