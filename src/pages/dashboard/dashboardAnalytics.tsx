import { useContext } from 'react'
import '../../assets/styles/dashboard/dashboard.css'
import DashboardMiniNav from '../../components/universal/navbar/dashboardMiniNav'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
import DashboardContext from '../../context/dashboard/dashboardContext'
import DashboardAnalyticsHeader from '../../components/dashboard/analytics/dashboardAnalyticsHeader'
import DashboardAnalyticsInfo from '../../components/dashboard/analytics/dashboardAnalyticsInfo'
import DashboardAnalyticsCharts from '../../components/dashboard/analytics/dashboardAnalyticsCharts'
const DashboardAnalytics: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    return(
        <>
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
        </>
    )
}

export default DashboardAnalytics