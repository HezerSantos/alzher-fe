import { useContext, useEffect, useState } from 'react'
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


const DashboardOverview: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    const authContext = useContext(AuthContext)
    const csrfContext = useContext(CsrfContext)
    const [ dashboardData, setDashboardData ] = useState(null)

    useEffect(() => {
        fetchDashboardData(csrfContext, authContext, setDashboardData, "overview", true)
        console.log(authContext?.isAuth)
    }, [])
    return(
        <>
        {authContext?.isAuthLoading? (
            <LoadingScreen />
        ) : (
            authContext?.isAuth? (
            <div className="page-section">
                <div className={`page-section__child dashboard-parent ${dashboardContext?.isHidden? "d-nav__grid-reset" : ""}`}>
                    <DashboardMiniNav />
                    <DashboardNav />
                    <DashboardOverviewContent />
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