import DashboardOverviewCategoryChart from "./dashboardOverviewCategoryChart"
import DashboardOverviewCategoryTable from "./dashboardOverviewCategoryTable"

interface CategoryOverview {
    name: string,
    amount: number,
    totalTransactions: number,
    percent: number
}

interface DashboardOverviewCategoryProps {
    categoryOverview: CategoryOverview[] | undefined
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