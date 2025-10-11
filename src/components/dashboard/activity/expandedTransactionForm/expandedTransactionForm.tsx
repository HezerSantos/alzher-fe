import React, { SetStateAction, useState } from "react"
import updateTransactionItem from "./helpers/updateTransaction"
import deleteTransaction from "./helpers/deleteTransaction"
import ExpandedTransactionElement from "./expandedTransactionElement"
import { AiOutlineLoading } from "react-icons/ai";
import useGlobalContext from "../../../../customHooks/useContexts"
interface SelectedTransactionItemType {
    transactionId: string,
    category: string,
    description: string,
    transactionDate: string,
    transactionAmount: number
}


interface ExpandedTransactionElementProps {
    selectedTransactionItem: SelectedTransactionItemType | null,
    isExpandedOpen: boolean,
    setIsExpandedOpen: React.Dispatch<SetStateAction<boolean>>,
    setTransactionData: React.Dispatch<SetStateAction<Map<string, SelectedTransactionItemType> | null>>
}

const closeExpandedTransaction = (e: React.MouseEvent<HTMLButtonElement>, setIsExpandedOpen: React.Dispatch<SetStateAction<boolean>>) => {
    e.preventDefault()
    setIsExpandedOpen(false)
}

interface ErrorType {
    msg: string,
    isError: boolean
}

const ExpandedTransactionForm: React.FC<ExpandedTransactionElementProps> = ({selectedTransactionItem, isExpandedOpen, setIsExpandedOpen, setTransactionData}) => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ categoryError, setCategoryError ] = useState<ErrorType | null>(null)
    const [ descriptionError, setDescriptionError ] = useState<ErrorType | null>(null)
    const [ transactionDateError, setTransactionDateError ] = useState<ErrorType | null>(null)
    const [ transactionAmountError, setTransactionAmountError ] = useState<ErrorType | null>(null)
    const globalContext = useGlobalContext()
    return(
        <>
            <form className={`transaction-expanded-item ${isExpandedOpen? "open-expanded-container" : ""}`}>
                <button type="button" onClick={(e) => closeExpandedTransaction(e, setIsExpandedOpen)}>close</button>
                <div>
                    <label htmlFor="edit-id">TID:</label>
                    <input name="transactionId" id="edit-id" type='text' readOnly defaultValue={selectedTransactionItem?.transactionId} />
                </div>
                <ExpandedTransactionElement 
                    transactionProp={selectedTransactionItem}
                    categoryName='category'
                    id='edit-category'
                    isText={false}
                    keyName='category'
                    error={categoryError}
                />
                <ExpandedTransactionElement 
                    transactionProp={selectedTransactionItem}
                    categoryName='description'
                    id='edit-description'
                    isText={true}
                    keyName='description'
                    error={descriptionError}
                />
                <ExpandedTransactionElement 
                    transactionProp={selectedTransactionItem}
                    categoryName='date'
                    id='edit-date'
                    isText={false}
                    keyName='transactionDate'
                    error={transactionDateError}
                />
                <ExpandedTransactionElement 
                    transactionProp={selectedTransactionItem}
                    categoryName='amount'
                    id='edit-amount'
                    isText={false}
                    keyName='transactionAmount'
                    error={transactionAmountError}
                />
                <button type='submit' onClick={(e) => updateTransactionItem(e, setTransactionData, globalContext, setIsLoading, setCategoryError, setDescriptionError, setTransactionDateError, setTransactionAmountError)}>
                    {!isLoading? "Save Changes" : <AiOutlineLoading className="button-loading"/>}
                </button>
                <button type="button" disabled={isLoading} onClick={(e) => deleteTransaction(selectedTransactionItem, setTransactionData, setIsExpandedOpen, e, globalContext, setIsLoading)}>
                    {!isLoading? "Delete Transaction" : <AiOutlineLoading className="button-loading"/>}
                </button>
            </form>
        </>
    )
}

export default ExpandedTransactionForm