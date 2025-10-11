import fetchDashboardData from "../../../../../functionHelpers/fetchDashboardData"
import React, { SetStateAction} from 'react'
import { DashboardOverviewContentType } from "../../types/mainOverviewTypes"

type HandleDashboardOverviewClickType = (
    semester: number,
    queryDetails: {year: string | undefined, semester: number},
    setQueryDetails: React.Dispatch<SetStateAction<{year: string | undefined, semester: number}>>,
    globalContext: GlobalContextType,
    setDashboardData: React.Dispatch<SetStateAction<DashboardOverviewContentType | null>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>> | undefined,
) => void

const handleDashboardOverviewClick:HandleDashboardOverviewClickType = async(semester, queryDetails, setQueryDetails, globalContext, setDashboardData, setIsLoading) => {
    const body = {
        year: queryDetails.year,
        semester: semester
    }

    await fetchDashboardData(globalContext, setDashboardData, "overview", body, null, setIsLoading)
    setQueryDetails(body)
} 

export default handleDashboardOverviewClick