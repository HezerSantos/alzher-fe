import { AxiosError } from "axios"
import React, { SetStateAction } from "react"
import handleApiError from "../../../../../app.config.error"
import api from "../../../../../app.config"
//Type for the function to update the transaction
type UpdateTransactionItemType = (
    e: React.FormEvent<HTMLButtonElement>,
    setTransactionData: React.Dispatch<SetStateAction<Map<string, SelectedTransactionItemType> | null>>,
    globalContext: GlobalContextType,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>,
    setCategoryError: React.Dispatch<SetStateAction<{msg: string, isError: boolean} | null>>,
    setDescriptionError: React.Dispatch<SetStateAction<{msg: string, isError: boolean} | null>>,
    setTransactionDateError: React.Dispatch<SetStateAction<{msg: string, isError: boolean} | null>>,
    setTransactionAmountError: React.Dispatch<SetStateAction<{msg: string, isError: boolean} | null>> ,
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
const updateTransactionItem: UpdateTransactionItemType = async(e, setTransactionData, globalContext, setIsLoading, setCategoryError, setDescriptionError, setTransactionDateError, setTransactionAmountError, newCsrf) => {
    try{
        e.preventDefault()
        setIsLoading(true)
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
                    csrftoken: newCsrf? newCsrf : globalContext.csrf?.csrfToken
                }
            }
        )

        //axios request here

        setTransactionData(prev => {
            const newData = new Map(prev)
            newData?.set(transactionId as string, updatedTransactionData as SelectedTransactionItemType)
            return newData
        })


        if(setCategoryError){
            setCategoryError(null)
        }
        if(setDescriptionError){
            setDescriptionError(null)
        }
        if(setTransactionDateError){
            setTransactionDateError(null)
        }
        if(setTransactionAmountError){
            setTransactionAmountError(null)
        }

    } catch (error) {
        console.error(error)
        const axiosError = error as AxiosError
        handleApiError({
            axiosError: axiosError,
            status: axiosError.status,
            globalContext: globalContext,
            callbacks: {
                handlePublicAuthRetry: () => updateTransactionItem(e, setTransactionData, globalContext, setIsLoading, setCategoryError, setDescriptionError, setTransactionDateError, setTransactionAmountError,),
                handleCsrfRetry: (newCsrf) => updateTransactionItem(e, setTransactionData, globalContext, setIsLoading, setCategoryError, setDescriptionError, setTransactionDateError, setTransactionAmountError, newCsrf),
                handleSecureAuthRetry: () => updateTransactionItem(e, setTransactionData, globalContext, setIsLoading, setCategoryError, setDescriptionError, setTransactionDateError, setTransactionAmountError,)
            },
            setStateErrors: [
                {
                    errorName: "category",
                    setState: setCategoryError
                },
                {
                    errorName: "description",
                    setState: setDescriptionError
                },
                {
                    errorName: "transactionDate",
                    setState: setTransactionDateError
                },
                {
                    errorName: "transactionAmount",
                    setState: setTransactionAmountError
                }
            ]
        })
    } finally {
        setIsLoading(false)
    }
}

export default updateTransactionItem