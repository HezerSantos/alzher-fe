import React, { SetStateAction } from "react"

interface SelectedTransactionItemType {
    transactionId: string,
    category: string,
    description: string,
    transactionDate: string,
    transactionAmount: number
}

//Transaction Item Props
interface TransactionItemProps {
    transactionId: string,
    category: string,
    description: string,
    transactionDate: string,
    transactionAmount: number,
    setSelectedTransactionItem: React.Dispatch<SetStateAction<SelectedTransactionItemType | null>>,
    setIsExpandedOpen: React.Dispatch<SetStateAction<boolean>>
}

//Transaction Expanded Toggle Button type
type OpenTransactionItemType = (
    e: React.MouseEvent<HTMLButtonElement>, 
    setSelectedTransactionItem: React.Dispatch<SetStateAction<SelectedTransactionItemType | null>>,
    selectedTransaction: SelectedTransactionItemType,
    setIsExpandedOpen: React.Dispatch<SetStateAction<boolean>>
) => void

//Transaction Expanded Toggle Button type 
// Opens the expanded page for transaction details
const openTransactionItem: OpenTransactionItemType = (e, setSelectedTransactionItem, selectedTransaction, setIsExpandedOpen) => {
    e.preventDefault()
    
    setSelectedTransactionItem(selectedTransaction)
    setIsExpandedOpen(true)
}   

//Transaction Item Component
const TransactionItem: React.FC<TransactionItemProps> = ({transactionId, category, description, transactionDate, transactionAmount, setSelectedTransactionItem, setIsExpandedOpen}) => {
    const selectedTransaction = {
        transactionId,
        category,
        description,
        transactionDate,
        transactionAmount
    }
    return(
        <>
            <div className='transaction-item-container'>
                <div className='transaction-checkbox'>
                    <input type='checkbox' id={transactionId}></input>
                </div>
                <button className='transaction-item' onClick={(e) => openTransactionItem(e, setSelectedTransactionItem, selectedTransaction, setIsExpandedOpen)}>
                    {/* <div className='transaction-hidden-detail'>
                        {transactionId}
                    </div> */}
                    <div>
                        <p className='transaction-category'>
                            {category}
                        </p>
                    </div>
                    <div className='transaction-hidden-detail transaction-description-container'>
                        <p className='transaction-description'>{description}</p>
                    </div>
                    <div>
                        {transactionDate}
                    </div>
                    <div>
                        {transactionAmount}
                    </div>
                </button>
            </div>
        </>
    )
}

export default TransactionItem