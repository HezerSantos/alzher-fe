import React, { SetStateAction, useContext, useState, useRef, useEffect } from 'react'
import '../../assets/styles/dashboard/dashboard.css'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
import DashboardContext from '../../context/dashboard/dashboardContext'
import { IoIosArrowDropdown } from "react-icons/io";
import DashboardMiniNav from '../../components/universal/navbar/dashboardMiniNav';

//Filter Button Props
interface FilterButtonProps {
    name: string
}

//Filter Button React Component
const FilterButton: React.FC<FilterButtonProps> = ({name}) => {
    return(
        <li>
            <button>
                {name}
            </button>
        </li>
    )
}


//Toggle Filter Type
type ToggleFilterType =  (
    e: React.MouseEvent<HTMLButtonElement>,
    setFilterToggle: React.Dispatch<SetStateAction<boolean>>
) => void


//Toggle Filter Button. 
// This is the function to change the visuals of the filter button
const toggleFilter: ToggleFilterType = (e, setFilterToggle) => {
    e.currentTarget.classList.toggle("filterButtonToggled")
    e.currentTarget.parentElement?.classList.toggle("activity-filters-border-style-fix")
    setFilterToggle(prev => !prev)
}


//Transaction Container Header Component
const TransactionContainerHeader: React.FC = () => {
    return(
        <>
        <div className='transaction-item-container transaction-container__header'>
            <div className='transaction-checkbox'>
                <input type='checkbox'></input>
            </div>
            <div className='transaction-item'>
                <div className='transaction-hidden-detail'>
                    Transaction ID
                </div>
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
                    <div className='transaction-hidden-detail'>
                        {transactionId}
                    </div>
                    <div>
                        {category}
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




//Transaction Container Props
interface TransactionContainerProps {
    setSelectedTransactionItem: React.Dispatch<SetStateAction<SelectedTransactionItemType | null>>,
    setIsExpandedOpen: React.Dispatch<SetStateAction<boolean>>,
    transactionData: SelectedTransactionItemType[]
}
//Transaction Container Component
const TransactionContainer: React.FC<TransactionContainerProps> = ({setSelectedTransactionItem, setIsExpandedOpen, transactionData}) => {
    return(
        <>
            <form className='transaction-container'>
                <TransactionContainerHeader />
                {transactionData.map((transaction) => {
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
                })}
            </form>
        </>
    )
}

//Function to close the expanded transaction tab
const clostExpandedTransaction = (e: React.MouseEvent<HTMLButtonElement>, setIsExpandedOpen: React.Dispatch<SetStateAction<boolean>>) => {
    e.preventDefault()
    setIsExpandedOpen(false)
}

//Type for the function to update the transaction
type UpdateTransactionItemType = (
    e: React.FormEvent<HTMLFormElement>,
    setTransactionData: React.Dispatch<SetStateAction<Map<string, SelectedTransactionItemType> | null>>
) => void

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

//Interface for the elements in the expanded transaction
interface ExpandedTransactionElementProps {
    transactionProp: SelectedTransactionItemType | null
    categoryName: string
    id: string
    isText: boolean
    keyName: keyof SelectedTransactionItemType
}

//Component of expanded transaction
const ExpandedTransactionElement: React.FC<ExpandedTransactionElementProps> = ({transactionProp, categoryName, id, isText, keyName}) => {
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
                <input 
                    name={categoryName}
                    type="text" 
                    id={id} 
                    value={transactionValue? transactionValue : ""}
                    onChange={(e) => setTransactionValue(e.target.value)}
                />
            ) : (
                <textarea name={categoryName} id={id} value={transactionValue} onChange={(e) => setTransactionValue(e.target.value)}></textarea>
            )}
        </div>
    )
}

//Interface for the basis of the transaction object
interface SelectedTransactionItemType {
    transactionId: string,
    category: string,
    description: string,
    transactionDate: string,
    transactionAmount: number
}


const exampleData = [
    {
        transactionId: "DO0001",
        category: "Dining",
        description: "McDonalds Quarter Cheese Pounder",
        transactionDate: "07/12/25",
        transactionAmount: 45.12
    },
    {
        transactionId: "DO0002",
        category: "Groceries",
        description: "Whole Foods Market - Weekly Grocery",
        transactionDate: "07/14/25",
        transactionAmount: 123.45
    },
    {
        transactionId: "DO0003",
        category: "Transport",
        description: "Uber ride to airport",
        transactionDate: "07/15/25",
        transactionAmount: 38.90
    },
    {
        transactionId: "DO0004",
        category: "Entertainment",
        description: "Netflix monthly subscription",
        transactionDate: "07/16/25",
        transactionAmount: 15.99
    },
    {
        transactionId: "DO0005",
        category: "Dining",
        description: "Starbucks - Iced Caramel Macchiato",
        transactionDate: "07/17/25",
        transactionAmount: 6.75
    },    
]

const DashboardActivity: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    const [ filterToggle, setFilterToggle ] = useState(false)
    const [ selectedTransactionItem, setSelectedTransactionItem ] = useState<SelectedTransactionItemType | null>(null)
    const toggleFiltersButton = useRef<HTMLButtonElement>(null)

    const [isExpandedOpen, setIsExpandedOpen] = useState<boolean>(false)
    
    const [ transactionData, setTransactionData ] = useState<Map<string, SelectedTransactionItemType> | null>(null)


    useEffect(() => {
        //fetchData as SelectedTransactionItemType[]
        //then pass to 
        // const newTransactionData = fetchedData.map(data => [data.transactionId, data] as [string, SelectedTransactionItemType])
        // const newTransactionDataMap = new Map(newTransactionData)
        // console.log(newTransactionDataMap)
        // setTransactionData(newTransactionDataMap)
    })
    useEffect(() => {
        const newTransactionData = exampleData.map(data => [data.transactionId, data] as [string, SelectedTransactionItemType])
        const newTransactionDataMap = new Map(newTransactionData)

        setTransactionData(newTransactionDataMap)
    }, [])


    return(
        <>
            <div className="page-section">
                <div className={`page-section__child dashboard-parent ${dashboardContext?.isHidden? "d-nav__grid-reset" : ""}`}>
                    <DashboardNav />
                    <DashboardMiniNav />
                    <div className='dashboard__activity-container'>
                        <form className={`transaction-expanded-item ${isExpandedOpen? "open-expanded-container" : ""}`} onSubmit={(e) => updateTransactionItem(e, setTransactionData)}>
                            <button onClick={(e) => clostExpandedTransaction(e, setIsExpandedOpen)}>close</button>
                            <div>
                                <label htmlFor="edit-id">Transaction ID:</label>
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
                            <button type='submit'>
                                Save Changes
                            </button>
                        </form>
                        <div className='activity-header'>
                            <h1>
                                Activity
                            </h1>
                        </div>
                        <div className='activity-search'>
                            <input type="text" placeholder='Search for order ID or name' name='searchInput' id='search-input'/>

                            <div className='activity-filters'>
                                <button ref={toggleFiltersButton} onClick={(e) => toggleFilter(e, setFilterToggle)}>
                                    Filters
                                    <IoIosArrowDropdown />
                                </button>
                                {filterToggle && (
                                    <div className='filter-container'>
                                        <ul>
                                            <FilterButton 
                                                name='category'
                                            />
                                            <FilterButton 
                                                name='description'
                                            />
                                            <FilterButton 
                                                name='date'
                                            />
                                            <FilterButton 
                                                name='amount'
                                            />
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <TransactionContainer 
                            setSelectedTransactionItem={setSelectedTransactionItem}
                            setIsExpandedOpen={setIsExpandedOpen}
                            transactionData={transactionData? [...transactionData.values()] : []}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardActivity