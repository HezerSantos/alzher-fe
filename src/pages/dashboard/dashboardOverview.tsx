import { useContext, useEffect } from 'react'
import '../../assets/styles/dashboard/dashboard.css'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
import DashboardContext from '../../context/dashboard/dashboardContext'
import DashboardOverviewContent from '../../components/dashboard/overview/dashboardOverviewContent'
import DashboardMiniNav from '../../components/universal/navbar/dashboardMiniNav'
import api from '../../app.config'
import AuthContext from '../../context/auth/authContext'
const DashboardOverview: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    const authContext = useContext(AuthContext)

    if(!authContext?.isAuth){
        return(
            <>
                Not Logged In
            </>
        )
    }
    useEffect(() => {
        const fetchData = async() => {
            const res = await api.get("/protected")
            console.log(res)
        }

        fetchData()
    })
    return(
        <>
            <div className="page-section">
                <div className={`page-section__child dashboard-parent ${dashboardContext?.isHidden? "d-nav__grid-reset" : ""}`}>
                    <DashboardMiniNav />
                    <DashboardNav />
                    <DashboardOverviewContent />
                </div>
            </div>
        </>
    )
}

export default DashboardOverview