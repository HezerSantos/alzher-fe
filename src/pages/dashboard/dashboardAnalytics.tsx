import { useContext, useEffect, useState } from 'react'
import '../../assets/styles/dashboard/dashboard.css'
import DashboardMiniNav from '../../components/universal/navbar/dashboardMiniNav'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
import DashboardContext from '../../context/dashboard/dashboardContext'
import DashboardAnalyticsHeader from '../../components/dashboard/analytics/dashboardAnalyticsHeader'
import DashboardAnalyticsInfo from '../../components/dashboard/analytics/dashboardAnalyticsInfo'
import DashboardAnalyticsCharts from '../../components/dashboard/analytics/dashboardAnalyticsCharts'
import AuthContext from '../../context/auth/authContext'
import fetchDashboardData from '../../functionHelpers/fetchDashboardData'
import CsrfContext from '../../context/csrf/csrfContext'
import LoadingScreen from '../helpers/loadingScreen'
import NotLoggedIn from '../helpers/notLoggedIn'

interface DashboardAnalyticsInfoType {
    header: string | undefined,
    amountSpent: number | undefined,
    primarySubHeader: string | null | undefined,
    primarySubValue: string | null | undefined,
    secondarySubHeader: string | null | undefined,
    secondarySubValue: string | null | undefined
}

interface CategoryDataType {
    category: string,
    ['Yearly Average']: number | undefined,
    ['Monthly Average']: number | undefined,
    ['Daily Average']: number | undefined,
    total: number | undefined
}

interface YearlyDataType {
    year: number | undefined,
    total: number | undefined
}

interface ScatterDataType {
    dailyAverage: number,
    dateOfMonth: number
}

interface BarChartDataType {
    month: string,
    [ year: `${number}`]: number | undefined
}
interface DashboardAnalyticsType {
    dashboardAnalyticsInfo: DashboardAnalyticsInfoType[],
    yearlyData: YearlyDataType[] | null,
    categoryData: CategoryDataType[] | null,
    overviewData: BarChartDataType[] | null,
    scatterData: ScatterDataType[] | null
}
const DashboardAnalytics: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    const authContext = useContext(AuthContext)
    const csrfContext = useContext(CsrfContext)
    const [ dashboardData, setDashboardData ] = useState<DashboardAnalyticsType | null>(null)
    const [ isLoading, setIsLoading ] = useState(false)
    useEffect(() => {
        fetchDashboardData(csrfContext, authContext, setDashboardData, "analytics", true, null, null, setIsLoading)
    }, [])
    return(
        <>
        {authContext?.isAuthState.isAuthLoading? (
            <LoadingScreen />
        ) : (
            authContext?.isAuthState.isAuth? (
                <div className="page-section">
                    <div className={`page-section__child dashboard-parent ${dashboardContext?.isHidden? "d-nav__grid-reset" : ""}`}>
                        <DashboardMiniNav />
                        <DashboardNav />
                        {!isLoading && (
                            <div className='dashboard__analytics-container'>
                                <DashboardAnalyticsHeader />
                                <DashboardAnalyticsInfo 
                                    dashboardAnalytics={dashboardData?.dashboardAnalyticsInfo}
                                />
                                <DashboardAnalyticsCharts 
                                    dashboardData={dashboardData}   
                                />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <NotLoggedIn />
            )
        )}
        </>
    )
}

export default DashboardAnalytics