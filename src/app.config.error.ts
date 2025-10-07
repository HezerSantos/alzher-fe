import React, { SetStateAction } from "react"
import api from "./app.config"
import { AxiosError } from "axios"

interface ApiCallbackType {
    handlePublicAuthRetry: () => void,
    handleCsrfRetry: (newCsrf: string | undefined) => void,
    handleSecureAuthRetry?: () => void
}


interface ErrorType {
    msg: string,
    isError: boolean
}

interface SetStateErrorsType {
    errorName: string,
    setState: React.Dispatch<SetStateAction< ErrorType | null >> | undefined,
}
type HandleApiErrorType =  (
    parameters: {
        axiosError: AxiosError,
        status: number | undefined,
        csrfContext: CsrfContextType | null,
        authContext: AuthContextType | null,
        callbacks: ApiCallbackType,
        setStateErrors?: SetStateErrorsType[],
        setFlashMessage?: React.Dispatch<SetStateAction<{error: boolean, ok: boolean}>>

    }
) => void


const handleApiError: HandleApiErrorType = async(parameters) => {
    const res = parameters.axiosError.response?.data as ApiErrorType
    // console.log(parameters.axiosError.response)
    // console.log(res.code)
    switch (parameters.status){
        case 400:
            switch (res.code){
                case "INVALID_CREDENTIALS":
                    const validationErrors = res.validationErrors
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
                case "INVALID_BODY":
                    const bodyValidationErrors = res.validationErrors
                    const bodyErrorMap = new Map(
                        bodyValidationErrors?.map(error => {
                            return [ error.path, error.msg]
                        })
                    )
                    parameters.setStateErrors?.forEach(error => {
                        if(bodyErrorMap.has(error.errorName)){
                            const msg = bodyErrorMap.get(error.errorName)
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
            switch (res.code){
                case "INVALID_ENTRY_TOKEN":
                    await api.get(`/api/auth/public`)
                    await parameters.callbacks.handlePublicAuthRetry()
                    break
                case "INVALID_REFRESH_TOKEN":
                    parameters.authContext?.logout()
                    console.log("logged out")
                    return false
                case "INVALID_ACCESS_TOKEN":
                    const retry = await parameters.authContext?.refresh()
                    if(!retry){
                        break
                    }
                    if(parameters.callbacks.handleSecureAuthRetry){
                        await parameters.callbacks.handleSecureAuthRetry()
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
                case "INVALID_SESSION":
                    parameters.authContext?.setIsAuthState({isAuth: false, isAuthLoading: false})
                    break
            }
            break
        case 403:
            switch (res.code) {
                case "INVALID_PERMISSIONS":
                    const newCsrf = await parameters.csrfContext?.getCsrf()
                    return await parameters.callbacks.handleCsrfRetry(newCsrf)
            }
    }
}

export default handleApiError