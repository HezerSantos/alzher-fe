import React, { SetStateAction} from "react"
import api from "../../../app.config"
import { AxiosError } from "axios"
import handleApiError from "../../../app.config.error"
type HandleSubmitType = (
    e: React.FormEvent<HTMLFormElement>,
    setIsError: React.Dispatch<SetStateAction<ErrorType | null>>,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>,
    csrfContext: CsrfContextType | null,
    authContext: AuthContextType | null,
    errorContext: ErrorContextType | null,
    path: string,
    method: 'get' | 'post' | 'patch' | 'delete',
    newCsrf?: string,
    newBody?: Record<string, any>
) => void

interface ErrorType {
    msg: string,
    isError: boolean
}

const handleSettingsSubmit: HandleSubmitType = async(e, setIsError, setIsOpen, csrfContext, authContext, errorContext, path, method, newCsrf, newBody) => {
    e.preventDefault()
    let body
    const form = e.currentTarget
    if(!newBody){
        const objectBody = [...form.elements].map((element) => {
            const el = element as HTMLInputElement

            return [el.name, el.value]
        }).filter((element) => element[1])
        body = Object.fromEntries(objectBody)
        newBody = body
    }
    try{
        await api[method](`/api/dashboard/settings/${path}`, 
            newBody? newBody : body, 
            {
                headers: {
                    csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
                }
            }
        )
        setIsError({msg: "", isError: false})
        setIsOpen(false)
    } catch (error) {
        const axiosError = error as AxiosError
        handleApiError(
            {
                axiosError: axiosError,
                status: axiosError.status,
                csrfContext: csrfContext,
                authContext: authContext,
                errorContext: errorContext,
                callbacks: {
                    handlePublicAuthRetry: () => handleSettingsSubmit(e, setIsError, setIsOpen, csrfContext, authContext, errorContext, path, method, undefined, newBody),
                    handleCsrfRetry: (newCsrf) => handleSettingsSubmit(e, setIsError, setIsOpen, csrfContext, authContext, errorContext, path, method, newCsrf, newBody),
                    handleSecureAuthRetry: () => handleSettingsSubmit(e, setIsError, setIsOpen, csrfContext, authContext, errorContext, path, method, undefined, newBody)
                },
                setStateErrors: [
                    {
                        errorName: "updatePassword",
                        setState: setIsError
                    }
                ]
            }
        )
    }
}

export default handleSettingsSubmit