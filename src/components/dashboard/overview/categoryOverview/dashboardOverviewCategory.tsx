
import CategoryOverviewType from "../types/categoryOverviewType"
import DashboardOverviewCategoryChart from "./dashboardOverviewCategoryChart"
import DashboardOverviewCategoryTable from "./dashboardOverviewCategoryTable"




interface DashboardOverviewCategoryProps {
    year: string | undefined,
    categoryOverview: CategoryOverviewType[] | undefined
}
const DashboardOverviewCategory: React.FC<DashboardOverviewCategoryProps> = ({year, categoryOverview}) => {
    return(
        <>
            <div className="do__category">
                <h1> {year} Category Overview</h1>
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