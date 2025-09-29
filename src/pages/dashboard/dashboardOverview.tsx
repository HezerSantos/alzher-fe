import { use, useContext, useEffect, useState } from 'react'
import '../../assets/styles/dashboard/dashboard.css'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
import DashboardContext from '../../context/dashboard/dashboardContext'
import DashboardOverviewContent from '../../components/dashboard/overview/dashboardOverviewContent'
import DashboardMiniNav from '../../components/universal/navbar/dashboardMiniNav'
import AuthContext from '../../context/auth/authContext'
import LoadingScreen from '../helpers/loadingScreen'
import NotLoggedIn from '../helpers/notLoggedIn'
import fetchDashboardData from '../../functionHelpers/fetchDashboardData'
import CsrfContext from '../../context/csrf/csrfContext'


interface OverviewDetailsItemsType {
    header: string,
    price: number,
    details?: {
        heading: string,
        value: string
    }[]
}

interface ChartDataType {
    month: string,
    [year: `${number}`]: number | undefined;
}

interface MonthItemsType {
    month: string,
    year: number,
    lowestCategory: string,
    highestCategory: string,
    totalSpent: number
}


interface DashboardOverviewContentProps {
    year: string | undefined,
    semester: number | undefined,
    overviewDetailsItems: OverviewDetailsItemsType[] | undefined,
    chartData: ChartDataType[] | undefined,
    monthItems: MonthItemsType[] | undefined,
    yearList: string[] | undefined
}


const DashboardOverview: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    const authContext = useContext(AuthContext)
    const csrfContext = useContext(CsrfContext)
    const [ dashboardData, setDashboardData ] = useState<DashboardOverviewContentProps | null>(null)
    const [ isLoading, setIsLoading ] = useState(false)
    useEffect(() => {
        const body = {
            year: 2024,
            semester: 1
        }
        fetchDashboardData(csrfContext, authContext, setDashboardData, "overview", body, null, setIsLoading)
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
                        <DashboardOverviewContent 
                            year={dashboardData?.year}
                            semester={dashboardData?.semester}
                            overviewDetailsItems={dashboardData?.overviewDetailsItems}
                            chartData={dashboardData?.chartData}
                            monthItems={dashboardData?.monthItems}
                            yearList={dashboardData?.yearList}
                            setDashboardData={setDashboardData}
                            setIsLoading={setIsLoading}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            ) : (
                <NotLoggedIn />
            )
        )}
        </>
    )
}

export default DashboardOverview