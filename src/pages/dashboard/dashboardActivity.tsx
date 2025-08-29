import React, { SetStateAction, useContext, useState, useRef } from 'react'
import '../../assets/styles/dashboard/dashboard.css'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
import DashboardContext from '../../context/dashboard/dashboardContext'
import { IoIosArrowDropdown } from "react-icons/io";
import DashboardMiniNav from '../../components/universal/navbar/dashboardMiniNav';

interface FilterButtonProps {
    name: string
}

const FilterButton: React.FC<FilterButtonProps> = ({name}) => {
    return(
        <li>
            <button>
                {name}
            </button>
        </li>
    )
}

type ToggleFilterType =  (
    e: React.MouseEvent<HTMLButtonElement>,
    setFilterToggle: React.Dispatch<SetStateAction<boolean>>
) => void

const toggleFilter: ToggleFilterType = (e, setFilterToggle) => {
    e.currentTarget.classList.toggle("filterButtonToggled")
    e.currentTarget.parentElement?.classList.toggle("activity-filters-border-style-fix")
    setFilterToggle(prev => !prev)
}

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


interface TransactionItemProps {
    transactionId: string,
    category: string,
    description: string,
    transactionDate: string,
    transactionAmount: number,
    setSelectedTransactionItem: React.Dispatch<SetStateAction<SelectedTransactionItemType | null>>,
    setIsExpandedOpen: React.Dispatch<SetStateAction<boolean>>
}

type OpenTransactionItemType = (
    e: React.MouseEvent<HTMLButtonElement>, 
    setSelectedTransactionItem: React.Dispatch<SetStateAction<SelectedTransactionItemType | null>>,
    selectedTransaction: SelectedTransactionItemType,
    setIsExpandedOpen: React.Dispatch<SetStateAction<boolean>>
) => void

const openTransactionItem: OpenTransactionItemType = (e, setSelectedTransactionItem, selectedTransaction, setIsExpandedOpen) => {
    e.preventDefault()
    
    setSelectedTransactionItem(selectedTransaction)
    setIsExpandedOpen(true)
}   

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

interface TransactionContainerProps {
    setSelectedTransactionItem: React.Dispatch<SetStateAction<SelectedTransactionItemType | null>>,
    setIsExpandedOpen: React.Dispatch<SetStateAction<boolean>>
}

const TransactionContainer: React.FC<TransactionContainerProps> = ({setSelectedTransactionItem, setIsExpandedOpen}) => {
    const test = []

    for(let i = 0; i < 111; i++){
        test.push(i)
    }
    return(
        <>
            <form className='transaction-container'>
                <TransactionContainerHeader />
                {test.map(item => {
                    return(
                        <TransactionItem 
                            key={item}
                            transactionId='DO0001'
                            category='Dining'
                            description='McDonalds Quarter Cheese Pounder Pounder'
                            transactionDate='07/12/25'
                            transactionAmount={14.52}
                            setSelectedTransactionItem={setSelectedTransactionItem}
                            setIsExpandedOpen={setIsExpandedOpen}
                        />
                    )
                })}
            </form>
        </>
    )
}

interface SelectedTransactionItemType {
    transactionId: string,
    category: string,
    description: string,
    transactionDate: string,
    transactionAmount: number
}
const DashboardActivity: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    const [ filterToggle, setFilterToggle ] = useState(false)
    const [ selectedTransactionItem, setSelectedTransactionItem ] = useState<SelectedTransactionItemType | null>(null)
    const toggleFiltersButton = useRef<HTMLButtonElement>(null)

    const [isExpandedOpen, setIsExpandedOpen] = useState<boolean>(false)

    return(
        <>
            <div className="page-section">
                <div className={`page-section__child dashboard-parent ${dashboardContext?.isHidden? "d-nav__grid-reset" : ""}`}>
                    <DashboardNav />
                    <DashboardMiniNav />
                    <div className='dashboard__activity-container'>
                        <div className={`transaction-expanded-item ${isExpandedOpen? "open-expanded-container" : ""}`}>
                            <button onClick={() => setIsExpandedOpen(false)}>close</button>
                            <p>Transaction: {selectedTransactionItem?.transactionId}</p>
                            <div>
                                <label htmlFor="edit-category">Category</label>
                                <input type="text" id='edit-category' defaultValue={selectedTransactionItem? selectedTransactionItem.category : ""}/>
                            </div>
                            <div>
                                <label htmlFor="edit-category">Description</label>
                                <textarea id='edit-description' defaultValue={selectedTransactionItem? selectedTransactionItem.description : ""}>
                                    
                                </textarea>
                            </div>
                            <div>
                                <label htmlFor="edit-category">Date</label>
                                <input type="text" id='edit-category' defaultValue={selectedTransactionItem? selectedTransactionItem.transactionDate : ""}/>
                            </div>
                            <div>
                                <label htmlFor="edit-category">Amount</label>
                                <input type="text" id='edit-category' defaultValue={selectedTransactionItem? selectedTransactionItem.transactionAmount : ""}/>
                            </div>
                            <button>
                                Save Changes
                            </button>
                        </div>
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
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardActivity