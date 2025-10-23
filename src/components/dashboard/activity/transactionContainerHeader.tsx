interface TransactionContainerHeaderProps {
    transactionContainerRef: React.RefObject<HTMLFormElement | null>;
}

type SelectAllTransactionType = (e: React.ChangeEvent<HTMLInputElement>) => void
//Transaction Container Header Component
const TransactionContainerHeader: React.FC<TransactionContainerHeaderProps> = ({transactionContainerRef}) => {
    const selectAllTransaction: SelectAllTransactionType = (e) => {
        const allTransactions = transactionContainerRef.current?.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
        allTransactions?.forEach(transaction => {
            if(e.target === transaction){
                return
            }
            if (e.target.checked){
                transaction.checked = true
            } else {
                transaction.checked = false
            }
        })
    }
    return(
        <>
        <div className='transaction-item-container transaction-container__header'>
            <div className='transaction-checkbox'>
                <input type='checkbox' onChange={(e) => selectAllTransaction(e)} />
            </div>
            <div className='transaction-item'>
                {/* <div className='transaction-hidden-detail'>
                    TID
                </div> */}
                <div>
                    Category
                </div>
                <div className='transaction-hidden-detail'>
                    Description
                </div>
                <div>
                    Date
                </div>
                <div>
                    Amount
                </div>
            </div>
        </div>
        </>
    )
}

export default TransactionContainerHeader