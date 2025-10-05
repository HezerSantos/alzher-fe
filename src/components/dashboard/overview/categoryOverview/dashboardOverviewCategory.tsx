
import CategoryOverviewType from "../types/categoryOverviewType"
import DashboardOverviewCategoryChart from "./dashboardOverviewCategoryChart"
import DashboardOverviewCategoryTable from "./dashboardOverviewCategoryTable"




interface DashboardOverviewCategoryProps {
    categoryOverview: CategoryOverviewType[] | undefined
}
const DashboardOverviewCategory: React.FC<DashboardOverviewCategoryProps> = ({categoryOverview}) => {
    return(
        <>
            <div className="do__category">
                <h1> 2024 Category Overview</h1>
                <div>
                    <DashboardOverviewCategoryChart  
                        categoryOverview={categoryOverview}
                    />
                    <DashboardOverviewCategoryTable 
                        categoryOverview={categoryOverview}
                    />
                </div>
            </div>
        </>
    )
}

export default DashboardOverviewCategory