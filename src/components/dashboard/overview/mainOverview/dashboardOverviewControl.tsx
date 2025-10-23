import React, { SetStateAction, useState} from 'react'
import { DashboardOverviewContentType } from '../types/mainOverviewTypes'
import handleDashboardOverview from './helpers/handleDashboardOverview'
import handleDashboardOverviewClick from './helpers/handleDashboardOverviewClick'
import { useLoading } from '../../../../context/loading/loadingProvider'
import useGlobalContext from '../../../../customHooks/useContexts'
handleDashboardOverviewClick

interface DashboardOverviewControlProps {
    selectedYear: string | undefined,
    selectedSemester: number | undefined,
    yearList: string[] | undefined,
    setDashboardData: React.Dispatch<SetStateAction<DashboardOverviewContentType | null>>,
}


const DashboardOverviewControl: React.FC<DashboardOverviewControlProps> = ({selectedYear, selectedSemester, yearList, setDashboardData}) => {
    const [ queryDetails, setQueryDetails ] = useState({year: selectedYear, semester: 1})
    const globalContext = useGlobalContext()
    const loading = useLoading()
    return(
        <>
            {yearList&& (
                <div className="dashboard-overview__control">
                    <select 
                        onChange={(e) => handleDashboardOverview(e, queryDetails, setQueryDetails, globalContext, setDashboardData, loading?.setIsLoading)}
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
                        onClick={() => handleDashboardOverviewClick(1, queryDetails, setQueryDetails, globalContext, setDashboardData, loading?.setIsLoading)}
                        className={selectedSemester === 1? "selected-semester" : ""}
                        disabled={selectedSemester === 1}
                    >
                        First Six Months
                    </button>
                    <button 
                        onClick={() => handleDashboardOverviewClick(2, queryDetails, setQueryDetails, globalContext, setDashboardData, loading?.setIsLoading)}
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