import React, { SetStateAction, useContext, useState } from "react"
import updateTransactionItem from "./helpers/updateTransaction"
import deleteTransaction from "./helpers/deleteTransaction"
import ExpandedTransactionElement from "./expandedTransactionElement"
import CsrfContext from "../../../../context/csrf/csrfContext"
import AuthContext from "../../../../context/auth/authContext"
import { AiOutlineLoading } from "react-icons/ai";
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


const ExpandedTransactionForm: React.FC<ExpandedTransactionElementProps> = ({selectedTransactionItem, isExpandedOpen, setIsExpandedOpen, setTransactionData}) => {
    const csrfContext = useContext(CsrfContext)
    const authContext = useContext(AuthContext)
    const [ isLoading, setIsLoading ] = useState(false)
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
                />
                <ExpandedTransactionElement 
                    transactionProp={selectedTransactionItem}
                    categoryName='description'
                    id='edit-description'
                    isText={true}
                    keyName='description'
                />
                <ExpandedTransactionElement 
                    transactionProp={selectedTransactionItem}
                    categoryName='date'
                    id='edit-date'
                    isText={false}
                    keyName='transactionDate'
                />
                <ExpandedTransactionElement 
                    transactionProp={selectedTransactionItem}
                    categoryName='amount'
                    id='edit-amount'
                    isText={false}
                    keyName='transactionAmount'
                />
                <button type='submit' onClick={(e) => updateTransactionItem(e, setTransactionData, csrfContext, authContext, setIsLoading)}>
                    Save Changes
                </button>
                <button type="button" disabled={isLoading} onClick={(e) => deleteTransaction(selectedTransactionItem, setTransactionData, setIsExpandedOpen, e, csrfContext, authContext, setIsLoading)}>
                    {!isLoading? "Delete Transaction" : <AiOutlineLoading className="button-loading"/>}
                </button>
            </form>
        </>
    )
}

export default ExpandedTransactionForm