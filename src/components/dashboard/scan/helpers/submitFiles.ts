import React, { SetStateAction } from 'react'
import handleApiError from '../../../../app.config.error'
import { AxiosError } from 'axios'
import api from '../../../../app.config'
type SubmitFilesType = (
    fileList: Map<string, File>, 
    csrfContext: CsrfContextType | null, 
    authContext: AuthContextType | null, 
    erroContext: ErrorContextType | null,
    setIsMessage: React.Dispatch<SetStateAction<{error: boolean, ok: boolean}>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>,
    newCsrf?: string
) => void

const submitFiles: SubmitFilesType = async(fileList, csrfContext, authContext, errorContext, setIsMessage, setIsLoading, newCsrf) => {
    const formData = new FormData()


    const filesArray = [...fileList.values()];
    filesArray.forEach(file => {
        formData.append('files', file)
    });
    setIsLoading(true)
    try {
        await api.post("/api/dashboard/scan", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
            }
        })
        console.log("success")
        setIsMessage({error: false, ok: true})
    } catch(error) {
        const axiosError = error as AxiosError

        handleApiError({
            axiosError: axiosError,
            status: axiosError.status,
            csrfContext: csrfContext,
            authContext: authContext,
            errorContext: errorContext,
            callbacks: {
                handlePublicAuthRetry: () => submitFiles(fileList, csrfContext, authContext, errorContext, setIsMessage, setIsLoading),
                handleCsrfRetry: (newCsrf) => submitFiles(fileList, csrfContext, authContext, errorContext, setIsMessage, setIsLoading, newCsrf),
                handleSecureAuthRetry: () => submitFiles(fileList, csrfContext, authContext, errorContext, setIsMessage, setIsLoading),
            },
            setFlashMessage: setIsMessage
            
        })
    } finally {
        setIsLoading(false)
    }
}

export default submitFiles