import React, { SetStateAction, useCallback, useEffect, useState } from "react"
import { IoIosArrowDropdown } from "react-icons/io";
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom";

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
    name: string,
    selectedCategory: string | null,
    setSelectedCategory: React.Dispatch<SetStateAction<string | null>>
}

//Toggle Filter Button. 
// This is the function to change the visuals of the filter button
const toggleFilter: ToggleFilterType = (e, setFilterToggle) => {
    e.currentTarget.classList.toggle("filterButtonToggled")
    e.currentTarget.parentElement?.classList.toggle("activity-filters-border-style-fix")
    setFilterToggle(prev => !prev)
}


//Filter Button React Component
const FilterButton: React.FC<FilterButtonProps> = ({name, selectedCategory, setSelectedCategory}) => {
    const [ searchParams ] = useSearchParams()
    const navigate = useNavigate()
    const applyFilter = useCallback(() => {
        const pageSize = searchParams.get("pageSize")
        setSelectedCategory(name)

        navigate(`/dashboard/activity?page=1&pageSize=${pageSize}&categoryFilter=${name}`)
    }, [searchParams])

    return(
        <li>
            <button 
                onClick={() => applyFilter()} 
                className={`${selectedCategory === name? "filter-selected" : ""}`}
            >
                {name}
            </button>
        </li>
    )
}



const categorySet = new Set([
    "Leisure",
    "Dining",
    "Subscriptions",
    "Grocery",
    "Transportation"
])

const ActivityInputHeader: React.FC<ActivityInputHeaderProps> = ({toggleFiltersButton, setFilterToggle, filterToggle}) => {
    const [ selectedCategory, setSelectedCategory ] = useState<string | null>(null)
    const [ searchParams, setSearchParams ] = useSearchParams()
    const navigate = useNavigate()

    const clearFilter = useCallback(() => {
        searchParams.delete("categoryFilter")
        setSearchParams(searchParams)
        console.log(location.search)
        navigate(`/dashboard/activity?page=${searchParams.get('page')}&pageSize=${searchParams.get("pageSize")}`)
    }, [])

    return(
        <>
            <div className='activity-search'>
                <input type="text" placeholder='Search for order ID or name' name='searchInput' id='search-input'/>
                <div>
                    {(searchParams.get('categoryFilter') && categorySet.has(String(searchParams.get('categoryFilter')))) && (
                        <button className="filter-clear" onClick={() => clearFilter()}>
                            Clear Filters
                        </button>
                    )}
                    <div className='activity-filters'>
                        <button ref={toggleFiltersButton} onClick={(e) => toggleFilter(e, setFilterToggle)}>
                            Filters
                            <IoIosArrowDropdown />
                        </button>
                        {filterToggle && (
                            <div className='filter-container'>
                                <ul>
                                    <FilterButton 
                                        name='Leisure'
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={setSelectedCategory}
                                    />
                                    <FilterButton 
                                        name='Dining'
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={setSelectedCategory}
                                    />
                                    <FilterButton 
                                        name='Subscriptions'
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={setSelectedCategory}
                                    />
                                    <FilterButton 
                                        name='Grocery'
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={setSelectedCategory}
                                    />
                                    <FilterButton 
                                        name='Transportation'
                                        selectedCategory={selectedCategory}
                                        setSelectedCategory={setSelectedCategory}
                                    />
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActivityInputHeader