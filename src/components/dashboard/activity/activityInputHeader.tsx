import React, { SetStateAction, useCallback, useState, useRef } from "react"
import { IoIosArrowDropdown } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";

interface ActivityInputHeaderProps {
    toggleFiltersButton: React.RefObject<HTMLButtonElement | null>,
    setFilterToggle: React.Dispatch<SetStateAction<boolean>>,
    filterToggle: boolean,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
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

        navigate(`/dashboard/activity?page=1&pageSize=${pageSize}&categoryFilter=${name}${searchParams.get('keyWord')? `&keyWord=${searchParams.get('keyWord')}` : ``}`)
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

type HandleInputChangeType = (e: React.ChangeEvent<HTMLInputElement>, setIsLoading: React.Dispatch<SetStateAction<boolean>>) => void

interface SearchBarProps {
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
}
const SearchBar: React.FC<SearchBarProps> = ({setIsLoading}) => {
    const [ input, setInput ] = useState("")
    const [ searchParams, setSearchParams ] = useSearchParams()
    const navigate = useNavigate()
    const timeout = useRef<NodeJS.Timeout | null>(null)

    const handleInputChange: HandleInputChangeType = ((e, setIsLoading) => {
        setIsLoading(true)
        setInput(e.target.value)
        if(timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(() => {
            if(!e.target.value.length) {
                searchParams.delete('keyWord')
                setSearchParams(searchParams)
            }
            navigate(`/dashboard/activity?page=1&pageSize=${searchParams.get('pageSize')}${searchParams.get('categoryFilter')? `&categoryFilter=${searchParams.get('categoryFilter')}` : ``}${e.target.value.length? `&keyWord=${e.target.value}` : ''}`)
        }, 2000)
    })
    return(
        <input 
            type="text" 
            placeholder='Search for order ID or name' 
            name='searchInput' 
            id='search-input'
            value={input}
            onChange={(e) => handleInputChange(e, setIsLoading)}
        />
    )
}



const categorySet = new Set([
    "Merchandise",
    "Entertainment",
    "Dining",
    "Subscriptions",
    "Grocery",
    "Transportation",
    "Bills"
])

const ActivityInputHeader: React.FC<ActivityInputHeaderProps> = ({toggleFiltersButton, setFilterToggle, filterToggle, setIsLoading}) => {
    const [ selectedCategory, setSelectedCategory ] = useState<string | null>(null)
    const [ searchParams, setSearchParams ] = useSearchParams()
    const navigate = useNavigate()

    const clearFilter = useCallback(() => {
        searchParams.delete("categoryFilter")
        setSearchParams(searchParams)
        navigate(`/dashboard/activity?page=${searchParams.get('page')}&pageSize=${searchParams.get("pageSize")}${searchParams.get('keyWord')? `&keyWord=${searchParams.get('keyWord')}` : ``}`)
    }, [searchParams])

    return(
        <>
            <div className='activity-search'>
                <SearchBar setIsLoading={setIsLoading} />
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
                                    {[...categorySet].map((category, index) => {
                                        return <FilterButton 
                                            name={category}
                                            selectedCategory={selectedCategory}
                                            setSelectedCategory={setSelectedCategory}
                                            key={index}
                                        />
                                    })}

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