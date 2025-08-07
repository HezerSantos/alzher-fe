import '../../assets/styles/dashboard/dashboard.css'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
const DashboardActivity: React.FC = () => {
    return(
        <>
            <div className="page-section">
                <div className='page-section__child dashboard-parent'>
                    <DashboardNav />
                </div>
            </div>
        </>
    )
}

export default DashboardActivity