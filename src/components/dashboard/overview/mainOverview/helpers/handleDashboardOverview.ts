import fetchDashboardData from "../../../../../functionHelpers/fetchDashboardData"
import React, { SetStateAction} from 'react'
import { DashboardOverviewContentType } from "../../types/mainOverviewTypes"
type HandleDashboardOverviewType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    queryDetails: {year: string | undefined, semester: number},
    setQueryDetails: React.Dispatch<SetStateAction<{year: string | undefined, semester: number}>>,
    csrfContext: CsrfContextType | null,
    authContext: AuthContextType | null,
    setDashboardData: React.Dispatch<SetStateAction<DashboardOverviewContentType | null>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
) => void


const handleDashboardOverview: HandleDashboardOverviewType = async(e, queryDetails, setQueryDetails, csrfContext, authContext, setDashboardData, setIsLoading) => {
    const newYear = e.target.value
    const body = {
        year: newYear,
        semester: queryDetails.semester
    }

    await fetchDashboardData(csrfContext, authContext, setDashboardData, "overview", body, null, setIsLoading)
    setQueryDetails(body)
}

export default handleDashboardOverview