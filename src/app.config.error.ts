import React, { SetStateAction } from "react"
import api from "./app.config"
import { AxiosError } from "axios"




type HandleRequestErrorType = (
    axiosError: AxiosError,
    csrfContext: CsrfContextType | null,
    status: number | undefined,
    retry: boolean,
) => void

type HandlePublicAuthType = (

) => void


interface ApiCallbackType {
    handlePublicAuthRetry: () => () => void,
    handleCsrfRetry: (newCsrf: string | undefined) => void,
    handleSecureAuthRetry?: () => () => void
}


interface ErrorType {
    msg: string,
    isError: boolean
}

interface SetStateErrorsType {
    errorName: string,
    setState: React.Dispatch<SetStateAction< ErrorType | null >>,
}
type HandleApiErrorType =  (
    parameters: {
        axiosError: AxiosError,
        status: number,
        csrfContext: CsrfContextType | null,
        authContext: AuthContextType | null,
        callbacks: ApiCallbackType,
        setStateErrors?: SetStateErrorsType[],
        setFlashMessage?: React.Dispatch<SetStateAction<{error: boolean, ok: boolean}>>

    }
) => void


const handleApiError: HandleApiErrorType = async(parameters) => {
    const res = parameters.axiosError.response?.data as ApiErrorType
    switch (parameters.status){
        case 400:
            switch (res.errors.code){
                case "INVALID_CREDENTIALS":
                    const validationErrors = res.errors.validationErrors
                    const errorMap = new Map(
                        validationErrors?.map(error => {
                            return [ error.path, error.msg]
                        })
                    )
                    parameters.setStateErrors?.forEach(error => {
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
                    break
                case "INVALID_QUERY":
                    break
                case "INVALID_PROCESS":
                    if(parameters.setFlashMessage){
                        parameters.setFlashMessage(({error: true, ok: false}))
                    }
                    break
            }
            break
        case 401:
            switch (res.errors.code){
                case "INVALID_ENTRY_TOKEN":
                    await api.get(`/api/auth/public`)
                    await parameters.callbacks.handlePublicAuthRetry()
                    break
                case "INVALID_REFRESH_TOKEN":
                    break
                case "INVALID_AUTH_TOKEN":
                    await parameters.authContext?.refresh(true)
                    if(parameters.callbacks.handleSecureAuthRetry){
                        parameters.callbacks.handleSecureAuthRetry()
                    }
                    break
                case "INVALID_CREDENTIALS":
                    parameters.setStateErrors?.forEach(error => {
                        if(error.setState){
                            error.setState({
                                msg: "Invalid Username or Password",
                                isError: true
                            })
                        }
                    })
                    break
            }
            break
        case 403:
            const newCsrf = await parameters.csrfContext?.getCsrf()
            await parameters.callbacks.handleCsrfRetry(newCsrf)
            break
    }
}
