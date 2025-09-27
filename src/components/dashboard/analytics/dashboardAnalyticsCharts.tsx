import OverviewChart from "../overview/charts/overviewChart";
import CategoryDomainChart from "./charts/categoryDomainChart"
import DailyScatterChart from "./charts/dailyScatterChart";
import YearlyLineChart from "./charts/yearlyLineChart"

interface CategoryDataType {
    category: string | undefined,
    ['Yearly Average']: number | undefined,
    ['Monthly Average']: number | undefined,
    ['Daily Average']: number | undefined,
    total: number | undefined
}

interface YearlyDataType {
    year: number | undefined,
    total: number | undefined
}

interface ScatterDataType {
    dailyAverage: number,
    dateOfMonth: number
}

interface BarChartDataType {
    month: string,
    [ year: `${number}`]: number | undefined
}

interface DashboardAnalyticsInfoType {
    header: string | undefined,
    amountSpent: number | undefined,
    primarySubHeader: string | null | undefined,
    primarySubValue: string | null | undefined,
    secondarySubHeader: string | null | undefined,
    secondarySubValue: string | null | undefined
}

interface DashboardAnalyticsType {
    dashboardAnalyticsInfo: DashboardAnalyticsInfoType[] | null,
    yearlyData: YearlyDataType[]  | null,
    categoryData: CategoryDataType[]  | null,
    overviewData: BarChartDataType[]  | null,
    scatterData: ScatterDataType[]  | null
}


interface DashboardAnalyticsChartsProps {
    dashboardData: DashboardAnalyticsType | null
}
const DashboardAnalyticsCharts: React.FC<DashboardAnalyticsChartsProps> = ({dashboardData}) => {
    return(
        <>
            <section className="analytics-charts">
                <div className="analytics-charts__container">
                    <div>
                        <h2>Yearly</h2>
                        <YearlyLineChart 
                            yearlyData={dashboardData?.yearlyData}
                        />
                    </div>
                    <div>
                        <h2>Category</h2>
                        <CategoryDomainChart 
                            categoryData={dashboardData?.categoryData}
                        />
                    </div>
                </div>
                <div className="analytics-charts__container">
                    <div>
                        <h2>Monthly</h2>
                        <OverviewChart 
                            overviewData={dashboardData?.overviewData}
                            yearOne="2024"
                            yearTwo="2025"
                        />
                    </div>
                    <div>
                        <h2>Daily</h2>
                        <DailyScatterChart 
                            scatterData={dashboardData?.scatterData}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default DashboardAnalyticsCharts