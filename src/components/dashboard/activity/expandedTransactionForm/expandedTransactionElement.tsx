import React, { useState, useEffect}  from "react"
interface SelectedTransactionItemType {
    transactionId: string,
    category: string,
    description: string,
    transactionDate: string,
    transactionAmount: number
}

//Interface for the elements in the expanded transaction
interface ExpandedTransactionElementProps {
    transactionProp: SelectedTransactionItemType | null,
    categoryName: string,
    id: string,
    isText: boolean,
    keyName: keyof SelectedTransactionItemType,
    error: {msg: string, isError:boolean} | null,
    select?: boolean
}

//Component of expanded transaction
const ExpandedTransactionElement: React.FC<ExpandedTransactionElementProps> = ({transactionProp, categoryName, id, isText, keyName, error, select}) => {
    const [transactionValue, setTransactionValue ] = useState("")
    useEffect(() => {
        if(transactionProp){
            setTransactionValue(String(transactionProp[keyName]))
        }
    }, [transactionProp])

    return(
        <div>
            <label htmlFor={id}>{categoryName[0].toUpperCase() + categoryName.slice(1)}</label>
            {!isText? (
                <>
                    {!select? (
                            <input 
                            name={categoryName}
                            type="text" 
                            id={id} 
                            value={transactionValue? transactionValue : ""}
                            onChange={(e) => setTransactionValue(e.target.value)}
                            className={error?.isError? "input-error" : ""}
                        />
                    ) : (
                        <select name={categoryName} id={id} value={transactionValue} onChange={(e) => setTransactionValue(e.target.value)}>
                            <option value={"Leisure"}>
                                Leisure
                            </option>
                            <option value={"Subscriptions"}>
                                Subscriptions
                            </option>
                            <option value={"Dining"}>
                                Dining
                            </option>
                            <option value={"Transportation"}>
                                Transportation
                            </option>
                            <option value={"Grocery"}>
                                Grocery
                            </option>
                        </select>
                    )}
                    {error?.isError && (
                        <>
                            <p className="validation-error">{error.msg}</p>
                        </>
                    )}
                </>
            ) : (
                <>
                    <textarea 
                        name={categoryName} 
                        id={id} 
                        value={transactionValue} 
                        onChange={(e) => setTransactionValue(e.target.value)}
                        className={error?.isError? "input-error" : ""}
                    >
                    </textarea>
                    {error?.isError && (
                        <>
                            <p className="validation-error">{error.msg}</p>
                        </>
                    )}
                </>
            )}
        </div>
    )
}

export default ExpandedTransactionElement