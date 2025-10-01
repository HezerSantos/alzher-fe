import { AxiosError } from "axios"
import React, { SetStateAction } from "react"
import handleApiError from "../../../../../app.config.error"
import api from "../../../../../app.config"
//Type for the function to update the transaction
type UpdateTransactionItemType = (
    e: React.FormEvent<HTMLButtonElement>,
    setTransactionData: React.Dispatch<SetStateAction<Map<string, SelectedTransactionItemType> | null>>,
    csrfContext: CsrfContextType | null,
    authContext: AuthContextType | null,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>,
    newCsrf?: string

) => void

interface SelectedTransactionItemType {
    transactionId: string,
    category: string,
    description: string,
    transactionDate: string,
    transactionAmount: number
}


//Update transaction Function
const updateTransactionItem: UpdateTransactionItemType = async(e, setTransactionData, csrfContext, authContext, setIsLoading, newCsrf) => {
    try{
        e.preventDefault()

        const buttonElement = e.target as HTMLElement
        const formElement = buttonElement.parentElement as HTMLFormElement
        const formData = new FormData(formElement)
        const transactionId = formData.get('transactionId')
        const newCategory = formData.get('category')
        const newDescription = formData.get('description')
        const newDate = formData.get('date')
        const newAmount = formData.get('amount') as number | null;

        const updatedTransactionData = {
            transactionId: transactionId,
            category: newCategory,
            description: newDescription,
            transactionDate: newDate,
            transactionAmount: newAmount
        }
        console.log(updatedTransactionData)
        await api.patch(
            `/api/dashboard/activity/${transactionId}`,
            updatedTransactionData,
            {
                headers: {
                    csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
                }
            }
        )

        //axios request here

        setTransactionData(prev => {
            const newData = new Map(prev)
            newData?.set(transactionId as string, updatedTransactionData as SelectedTransactionItemType)
            return newData
        })
    } catch (error) {
        console.error(error)
        const axiosError = error as AxiosError
        handleApiError({
            axiosError: axiosError,
            status: axiosError.status,
            csrfContext: csrfContext,
            authContext: authContext,
            callbacks: {
                handlePublicAuthRetry: () => updateTransactionItem(e, setTransactionData, csrfContext, authContext, setIsLoading),
                handleCsrfRetry: (newCsrf) => updateTransactionItem(e, setTransactionData, csrfContext, authContext, setIsLoading, newCsrf),
                handleSecureAuthRetry: () => updateTransactionItem(e, setTransactionData, csrfContext, authContext, setIsLoading)
            }
        })
    }
}

export default updateTransactionItem