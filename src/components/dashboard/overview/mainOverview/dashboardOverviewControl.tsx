import React, { SetStateAction, useState} from 'react'
import { DashboardOverviewContentType } from '../types/mainOverviewTypes'
import handleDashboardOverview from './helpers/handleDashboardOverview'
import handleDashboardOverviewClick from './helpers/handleDashboardOverviewClick'
handleDashboardOverviewClick

interface DashboardOverviewControlProps {
    selectedYear: string | undefined,
    selectedSemester: number | undefined,
    yearList: string[] | undefined,
    csrfContext: CsrfContextType | null,
    authContext: AuthContextType | null,
    setDashboardData: React.Dispatch<SetStateAction<DashboardOverviewContentType | null>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
}


const DashboardOverviewControl: React.FC<DashboardOverviewControlProps> = ({selectedYear, selectedSemester, yearList, csrfContext, authContext, setDashboardData, setIsLoading}) => {
    
    const [ queryDetails, setQueryDetails ] = useState({year: selectedYear, semester: 1})

    return(
        <>
            {yearList&& (
                <div className="dashboard-overview__control">
                    <select 
                        onChange={(e) => handleDashboardOverview(e, queryDetails, setQueryDetails, csrfContext, authContext, setDashboardData, setIsLoading)}
                        value={selectedYear}
                    >
                        {yearList.map((year, index) => {
                            return <option 
                                        key={index} 
                                        value={year}
                                    >
                                        {year}
                                    </option>
                        })}
                    </select>
                    <button 
                        onClick={() => handleDashboardOverviewClick(1, queryDetails, setQueryDetails, csrfContext, authContext, setDashboardData, setIsLoading)}
                        className={selectedSemester === 1? "selected-semester" : ""}
                        disabled={selectedSemester === 1}
                    >
                        First Six Months
                    </button>
                    <button 
                        onClick={() => handleDashboardOverviewClick(2, queryDetails, setQueryDetails, csrfContext, authContext, setDashboardData, setIsLoading)}
                        className={selectedSemester === 2? "selected-semester" : ""}
                        disabled={selectedSemester === 2}
                    >
                        Last Six Months
                    </button>
                </div>
            )}
        </>
    )
}

export default DashboardOverviewControl