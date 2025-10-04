import DashboardOverviewCategoryChart from "./dashboardOverviewCategoryChart"
import DashboardOverviewCategoryItem from "./dashboardOverviewCategoryItem"

const DashboardOverviewCategory: React.FC = () => {
    return(
        <>
            <div className="do__category">
                <h1> 2024 Category Overview</h1>
                {/* <DashboardOverviewCategoryItem /> */}
                <DashboardOverviewCategoryChart />
            </div>
        </>
    )
}

export default DashboardOverviewCategory