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
            <div className='transaction-container__header transaction-item'>
                <input type='checkbox'></input>
                <div className='transaction-hidden-detail'>
                    Transaction ID:
                </div>
                <div>
                    Category:
                </div>
                <div className='transaction-hidden-detail'>
                    Description:
                </div>
                <div>
                    Date:
                </div>
                <div>
                    Amount:
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
    transactionAmount: number
}

const TransactionItem: React.FC<TransactionItemProps> = ({transactionId, category, description, transactionDate, transactionAmount}) => {
    return(
        <>
            <div className='transaction-item'>
                <input type='checkbox' id={transactionId}></input>
                <div className='transaction-hidden-detail'>
                    {transactionId}
                </div>
                <div>
                    {category}
                </div>
                <div className='transaction-hidden-detail'>
                    <p className='transaction-description'>{description}</p>
                </div>
                <div>
                    {transactionDate}
                </div>
                <div>
                    {transactionAmount}
                </div>
            </div>
        </>
    )
}


const TransactionContainer: React.FC = () => {
    const test = []

    for(let i = 0; i < 100; i++){
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
                            description='McDonalds Quarter Cheese Pounder'
                            transactionDate='07/12/25'
                            transactionAmount={14.52}
                        />
                    )
                })}
            </form>
        </>
    )
}
const DashboardActivity: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    const [ filterToggle, setFilterToggle ] = useState(false)

    const toggleFiltersButton = useRef<HTMLButtonElement>(null)
    return(
        <>
            <div className="page-section">
                <div className={`page-section__child dashboard-parent ${dashboardContext?.isHidden? "d-nav__grid-reset" : ""}`}>
                    <DashboardNav />
                    <DashboardMiniNav />
                    <div className='dashboard__activity-container'>
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
                        <TransactionContainer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardActivity