import React, { SetStateAction, useContext, useState, useRef } from 'react'
import '../../assets/styles/dashboard/dashboard.css'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
import DashboardContext from '../../context/dashboard/dashboardContext'
import { IoIosArrowDropdown } from "react-icons/io";

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
    setFilterToggle(prev => !prev)
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardActivity