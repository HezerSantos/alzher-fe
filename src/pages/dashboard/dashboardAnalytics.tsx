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
const DashboardAnalytics: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    const authContext = useContext(AuthContext)
    const csrfContext = useContext(CsrfContext)
    const [ dashboardData, setDashboardData ] = useState(null)

    useEffect(() => {
        fetchDashboardData(csrfContext, authContext, setDashboardData, "analytics", true)
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
                        <div className='dashboard__analytics-container'>
                            <DashboardAnalyticsHeader />
                            <DashboardAnalyticsInfo />
                            <DashboardAnalyticsCharts />
                        </div>
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