
import { useLoading } from "../../../../context/loading/loadingProvider"
import CategoryOverviewType from "../types/categoryOverviewType"
import DashboardOverviewCategoryChart from "./dashboardOverviewCategoryChart"
import DashboardOverviewCategoryTable from "./dashboardOverviewCategoryTable"




interface DashboardOverviewCategoryProps {
    year: string | undefined,
    categoryOverview: CategoryOverviewType[] | undefined
}
const DashboardOverviewCategory: React.FC<DashboardOverviewCategoryProps> = ({year, categoryOverview}) => {
    const loading = useLoading()
    return(
        <>
            <div className="do__category">
                <h1> {year} Category Overview</h1>
                <div>
                    {!loading?.isLoading? (
                        <>
                            <DashboardOverviewCategoryChart  
                                categoryOverview={categoryOverview}
                            />
                            <DashboardOverviewCategoryTable 
                                categoryOverview={categoryOverview}
                            />
                        </>
                    ) : (
                        <>
                            <div className="do-cc-loading"></div>
                            <div className="do-ct-loading"></div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default DashboardOverviewCategory