import TransactionContainerHeader from "./transactionContainerHeader"
import TransactionItem from "./transactionItem"
import React, { SetStateAction } from "react"
import TransactionItemLoading from "./transactionItemLoading";

interface SelectedTransactionItemType {
    transactionId: string,
    category: string,
    description: string,
    transactionDate: string,
    transactionAmount: number
}

//Transaction Container Props
interface TransactionContainerProps {
    setSelectedTransactionItem: React.Dispatch<SetStateAction<SelectedTransactionItemType | null>>,
    setIsExpandedOpen: React.Dispatch<SetStateAction<boolean>>,
    transactionData: SelectedTransactionItemType[],
    transactionContainerRef: React.RefObject<HTMLFormElement | null>;
    isLoading: boolean
}
//Transaction Container Component
const TransactionContainer: React.FC<TransactionContainerProps> = ({setSelectedTransactionItem, setIsExpandedOpen, transactionData, transactionContainerRef, isLoading}) => {
    return(
        <>
            <form className={`transaction-container`} ref={transactionContainerRef}>
                <TransactionContainerHeader 
                    transactionContainerRef={transactionContainerRef}
                />
                {isLoading? (
                    <>
                        {[...Array(5)].map((_, index) => {
                            return (<TransactionItemLoading key={index} />)
                        })}
                    </>
                ) : (
                    <>
                        {transactionData.length? (
                            transactionData.map((transaction) => {
                                return(
                                    <TransactionItem 
                                        key={transaction.transactionId}
                                        transactionId={transaction.transactionId}
                                        category={transaction.category}
                                        description={transaction.description}
                                        transactionDate={transaction.transactionDate}
                                        transactionAmount={transaction.transactionAmount}
                                        setSelectedTransactionItem={setSelectedTransactionItem}
                                        setIsExpandedOpen={setIsExpandedOpen}
                                    />
                                )
                            })
                        ) : (
                            <>
                                <p className="transaction-container__empty">
                                    No Data Availiable
                                </p>
                            </>
                        )}
                    </>
                )}

            </form>
        </>
    )
}

export default TransactionContainer