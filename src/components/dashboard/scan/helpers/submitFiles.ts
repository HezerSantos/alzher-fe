import React, { SetStateAction } from 'react'
import handleApiError from '../../../../app.config.error'
import { AxiosError } from 'axios'
import api from '../../../../app.config'
type SubmitFilesType = (
    fileList: Map<string, File>, 
    globalContext: GlobalContextType,
    setIsMessage: React.Dispatch<SetStateAction<{error: boolean, ok: boolean}>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>,
    newCsrf?: string
) => void

const submitFiles: SubmitFilesType = async(fileList, globalContext, setIsMessage, setIsLoading, newCsrf) => {
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
                csrftoken: newCsrf? newCsrf : globalContext.csrf?.csrfToken
            }
        })
        console.log("success")
        setIsMessage({error: false, ok: true})
    } catch(error) {
        const axiosError = error as AxiosError

        handleApiError({
            axiosError: axiosError,
            status: axiosError.status,
            globalContext,
            callbacks: {
                handlePublicAuthRetry: () => submitFiles(fileList, globalContext, setIsMessage, setIsLoading),
                handleCsrfRetry: (newCsrf) => submitFiles(fileList, globalContext, setIsMessage, setIsLoading, newCsrf),
                handleSecureAuthRetry: () => submitFiles(fileList, globalContext, setIsMessage, setIsLoading),
            },
            setFlashMessage: setIsMessage
            
        })
    } finally {
        setIsLoading(false)
    }
}

export default submitFiles