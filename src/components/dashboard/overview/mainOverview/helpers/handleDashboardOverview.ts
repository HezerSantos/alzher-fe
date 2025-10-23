import fetchDashboardData from "../../../../../functionHelpers/fetchDashboardData"
import React, { SetStateAction} from 'react'
import { DashboardOverviewContentType } from "../../types/mainOverviewTypes"
type HandleDashboardOverviewType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    queryDetails: {year: string | undefined, semester: number},
    setQueryDetails: React.Dispatch<SetStateAction<{year: string | undefined, semester: number}>>,
    globalContext: GlobalContextType,
    setDashboardData: React.Dispatch<SetStateAction<DashboardOverviewContentType | null>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>> | undefined,
) => void


const handleDashboardOverview: HandleDashboardOverviewType = async(e, queryDetails, setQueryDetails, globalContext, setDashboardData, setIsLoading,) => {
    const newYear = e.target.value
    const body = {
        year: newYear,
        semester: queryDetails.semester
    }

    await fetchDashboardData(globalContext, setDashboardData, "overview", body, null, setIsLoading)
    setQueryDetails(body)
}

export default handleDashboardOverview