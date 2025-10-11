import React, { SetStateAction } from "react"
import handleApiError from "../../../../../app.config.error"
import { AxiosError } from "axios"
import api from "../../../../../app.config"
interface SelectedTransactionItemType {
    transactionId: string,
    category: string,
    description: string,
    transactionDate: string,
    transactionAmount: number
}

//Delete transaction type
type DeleteTransactionType = (
    selectedTransactionItem: SelectedTransactionItemType | null,
    setTransactionData: React.Dispatch<SetStateAction<Map<string, SelectedTransactionItemType> | null>>,
    setIsExpandedOpen: React.Dispatch<SetStateAction<boolean>>,
    e: React.MouseEvent<HTMLButtonElement>,
    globalContext: GlobalContextType,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>,
    newCsrf?: string
) => void

//function to delete transaction for client
const deleteTransaction: DeleteTransactionType = async(selectedTransactionItem, setTransactionData, setIsExpandedOpen, e, globalContext, setIsLoading, newCsrf) => {
    try{
        setIsLoading(true)
        e.preventDefault()
        const selectedItemId = selectedTransactionItem?.transactionId

        await api.delete(`/api/dashboard/activity/${selectedItemId}`, {
            headers: {
                csrftoken: newCsrf? newCsrf : globalContext.csrf?.csrfToken
            }
        })
        setIsExpandedOpen(false)
        setTransactionData(prev => {
            const newTransactionMap = new Map(prev)
            newTransactionMap.delete(String(selectedItemId))
            return newTransactionMap
        })
    } catch (error) {
        console.log(error)
        const axiosError = error as AxiosError
        handleApiError({
            axiosError: axiosError,
            status: axiosError?.status,
            globalContext: globalContext,
            callbacks: {
                handlePublicAuthRetry: () => deleteTransaction(selectedTransactionItem, setTransactionData, setIsExpandedOpen, e, globalContext, setIsLoading),
                handleCsrfRetry: (newCsrf) => deleteTransaction(selectedTransactionItem, setTransactionData, setIsExpandedOpen, e, globalContext, setIsLoading, newCsrf),
                handleSecureAuthRetry: () => deleteTransaction(selectedTransactionItem, setTransactionData, setIsExpandedOpen, e, globalContext, setIsLoading)
            }
        })
    } finally {
        setIsLoading(false)
    }
}

export default deleteTransaction