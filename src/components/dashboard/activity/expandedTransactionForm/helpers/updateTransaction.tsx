import React, { SetStateAction } from "react"
//Type for the function to update the transaction
type UpdateTransactionItemType = (
    e: React.FormEvent<HTMLFormElement>,
    setTransactionData: React.Dispatch<SetStateAction<Map<string, SelectedTransactionItemType> | null>>
) => void

interface SelectedTransactionItemType {
    transactionId: string,
    category: string,
    description: string,
    transactionDate: string,
    transactionAmount: number
}


//Update transaction Function
const updateTransactionItem: UpdateTransactionItemType = (e, setTransactionData) => {
    e.preventDefault()

    const formElement = e.currentTarget
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

    //axios request here

    setTransactionData(prev => {
        const newData = new Map(prev)
        newData?.set(transactionId as string, updatedTransactionData as SelectedTransactionItemType)
        return newData
    })
}

export default updateTransactionItem