import React, { SetStateAction } from "react"
import { IoIosArrowDropdown } from "react-icons/io";

interface ActivityInputHeaderProps {
    toggleFiltersButton: React.RefObject<HTMLButtonElement | null>,
    setFilterToggle: React.Dispatch<SetStateAction<boolean>>,
    filterToggle: boolean
}

//Toggle Filter Type
type ToggleFilterType =  (
    e: React.MouseEvent<HTMLButtonElement>,
    setFilterToggle: React.Dispatch<SetStateAction<boolean>>
) => void

//Filter Button Props
interface FilterButtonProps {
    name: string
}

//Toggle Filter Button. 
// This is the function to change the visuals of the filter button
const toggleFilter: ToggleFilterType = (e, setFilterToggle) => {
    e.currentTarget.classList.toggle("filterButtonToggled")
    e.currentTarget.parentElement?.classList.toggle("activity-filters-border-style-fix")
    setFilterToggle(prev => !prev)
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

const ActivityInputHeader: React.FC<ActivityInputHeaderProps> = ({toggleFiltersButton, setFilterToggle, filterToggle}) => {

    return(
        <>
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
        </>
    )
}

export default ActivityInputHeader