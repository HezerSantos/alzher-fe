import fetchDashboardData from "../../../../../functionHelpers/fetchDashboardData"
import React, { SetStateAction} from 'react'
import { DashboardOverviewContentType } from "../../types/mainOverviewTypes"

type HandleDashboardOverviewClickType = (
    semester: number,
    queryDetails: {year: string | undefined, semester: number},
    setQueryDetails: React.Dispatch<SetStateAction<{year: string | undefined, semester: number}>>,
    csrfContext: CsrfContextType | null,
    authContext: AuthContextType | null,
    setDashboardData: React.Dispatch<SetStateAction<DashboardOverviewContentType | null>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>> | undefined,
    errorContext: ErrorContextType | null
) => void

const handleDashboardOverviewClick:HandleDashboardOverviewClickType = async(semester, queryDetails, setQueryDetails, csrfContext, authContext, setDashboardData, setIsLoading, errorContext) => {
    const body = {
        year: queryDetails.year,
        semester: semester
    }

    await fetchDashboardData(csrfContext, authContext, errorContext, setDashboardData, "overview", body, null, setIsLoading)
    setQueryDetails(body)
} 

export default handleDashboardOverviewClick