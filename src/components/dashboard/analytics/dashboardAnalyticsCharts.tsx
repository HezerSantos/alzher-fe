import OverviewChart from "../overview/charts/overviewChart";
import CategoryDomainChart from "./charts/categoryDomainChart"
import DailyScatterChart from "./charts/dailyScatterChart";
import YearlyLineChart from "./charts/yearlyLineChart"
import DashboardAnalyticsChartLoading from "./dashboardAnalyticsChartLoading";

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
    dashboardData: DashboardAnalyticsType | null,
    isLoading: boolean
}
const DashboardAnalyticsCharts: React.FC<DashboardAnalyticsChartsProps> = ({dashboardData, isLoading}) => {
    return(
        <>
            <section className="analytics-charts">
                <div className="analytics-charts__container">
                    <div>
                        <h2>Yearly</h2>
                        {!isLoading? (
                            <>
                                <YearlyLineChart 
                                    yearlyData={dashboardData?.yearlyData}
                                />
                            </>
                        ) : (
                            <DashboardAnalyticsChartLoading />
                        )}
                    </div>
                    <div>
                        <h2>Category</h2>
                        {!isLoading? (
                            <>
                                <CategoryDomainChart 
                                    categoryData={dashboardData?.categoryData}
                                />
                            </>
                        ) : (
                            <DashboardAnalyticsChartLoading />
                        )}
                    </div>
                </div>
                <div className="analytics-charts__container">
                    <div>
                        <h2>Monthly</h2>
                        {!isLoading? (
                            <>
                                <OverviewChart 
                                    overviewData={dashboardData?.overviewData}
                                    yearOne="2024"
                                    yearTwo="2025"
                                />
                            </>
                        ) : (
                            <DashboardAnalyticsChartLoading />
                        )}
                    </div>
                    <div>
                        <h2>Daily</h2>
                        {!isLoading? (
                            <>
                                <DailyScatterChart 
                                    scatterData={dashboardData?.scatterData}
                                />
                            </>
                        ) : (
                            <DashboardAnalyticsChartLoading />
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default DashboardAnalyticsCharts