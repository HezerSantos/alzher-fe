import OverviewChart from "../overview/charts/overviewChart";
import CategoryDomainChart from "./charts/categoryDomainChart"
import DailyScatterChart from "./charts/dailyScatterChart";
import YearlyLineChart from "./charts/yearlyLineChart"


const data3 = [
    {
        category: "dining",
        ['Yearly Average']: 5200,
        ['Monthly Average']: 450,
        ['Daily Average']: 20,
        total: 25392
    },
    {
        category: "entertainment",
        ['Yearly Average']: 3100,
        ['Monthly Average']: 260,
        ['Daily Average']: 12,
        total: 18220
    },
    {
        category: "shopping",
        ['Yearly Average']: 7200,
        ['Monthly Average']: 600,
        ['Daily Average']: 24,
        total: 34800
    },
    {
        category: "utilities",
        ['Yearly Average']: 4800,
        ['Monthly Average']: 400,
        ['Daily Average']: 16,
        total: 19200
    },
    {
        category: "other",
        ['Yearly Average']: 4800,
        ['Monthly Average']: 400,
        ['Daily Average']: 16,
        total: 19200
    }
];

const data2 = [
    {
        year: 2019,
        total: 10320
    },
    {
        year: 2020,
        total: 8425
    },
    {
        year: 2021,
        total: 15980
    },
    {
        year: 2022,
        total: 12560
    },
    {
        year: 2023,
        total: 19230
    },
    {
        year: 2024,
        total: 11145
    },
    {
        year: 2025,
        total: 17680
    }
];

const testData = [ //DELETE AFTER
    {
        month: "January",
        ['2024']: 1732,
        ['2025']: 2874
    },
    {
        month: "February",
        ['2024']: 1196,
        ['2025']: 3451
    },
    {
        month: "March",
        ['2024']: 1608,
        ['2025']: 2253
    },
    {
        month: "April",
        ['2024']: 1421,
        ['2025']: 3932
    },
    {
        month: "May",
        ['2024']: 1887,
        ['2025']: 2765
    },
    {
        month: "June",
        ['2024']: 1344,
        ['2025']: 3629
    }
];

const DashboardAnalyticsCharts: React.FC = () => {
    return(
        <>
            <section className="analytics-charts">
                <div className="analytics-charts__container">
                    <div>
                        <h2>Yearly</h2>
                        <YearlyLineChart 
                            yearlyData={data2}
                        />
                    </div>
                    <div>
                        <h2>Category</h2>
                        <CategoryDomainChart 
                            categoryData={data3}
                        />
                    </div>
                </div>
                <div className="analytics-charts__container">
                    <div>
                        <h2>Monthly</h2>
                        <OverviewChart 
                            overviewData={testData}
                            yearOne="2024"
                            yearTwo="2025"
                        />
                    </div>
                    <div>
                        <h2>Daily</h2>
                        <DailyScatterChart />
                    </div>
                </div>
            </section>
        </>
    )
}

export default DashboardAnalyticsCharts