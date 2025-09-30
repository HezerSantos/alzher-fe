import React, { SetStateAction } from "react"
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
    e: React.MouseEvent<HTMLButtonElement>
) => void

//function to delete transaction for client
const deleteTransaction: DeleteTransactionType = (selectedTransactionItem, setTransactionData, setIsExpandedOpen, e) => {
    e.preventDefault()
    const selectedItemId = selectedTransactionItem?.transactionId
    setIsExpandedOpen(false)
    setTransactionData(prev => {
        const newTransactionMap = new Map(prev)
        newTransactionMap.delete(String(selectedItemId))
        return newTransactionMap
    })
}

export default deleteTransaction