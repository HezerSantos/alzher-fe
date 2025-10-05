import React, { SetStateAction, useContext } from "react"
import OverviewChart from "./charts/overviewChart";
import AuthContext from "../../../context/auth/authContext";
import CsrfContext from "../../../context/csrf/csrfContext";
import DashboardOverviewCategory from "./categoryOverview/dashboardOverviewCategory";
import CategoryOverviewType from "./types/categoryOverviewType";
import { OverviewDetailsItemsType, ChartDataType, MonthItemsType, DashboardOverviewContentType } from "./types/mainOverviewTypes";
import DashboardOverviewDetails from "./mainOverview/dashboardOverviewDetails";
import DashboardOverviewControl from "./mainOverview/dashboardOverviewControl";
import MonthItem, { EmptyMonthItem } from "./mainOverview/monthItem";



interface DashboardOverviewContentProps {
    year: string | undefined,
    semester: number | undefined,
    overviewDetailsItems: OverviewDetailsItemsType[] | undefined,
    chartData: ChartDataType[] | undefined,
    monthItems: MonthItemsType[] | undefined,
    yearList: string[] | undefined,
    categoryOverview: CategoryOverviewType[] | undefined
    setDashboardData: React.Dispatch<SetStateAction<DashboardOverviewContentType | null>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>,
    isLoading: boolean
}



const DashboardOverviewContent: React.FC<DashboardOverviewContentProps> = ({year, semester, overviewDetailsItems, chartData, monthItems, yearList, categoryOverview, setDashboardData, setIsLoading, isLoading}) => {
    const authContext = useContext(AuthContext)
    const csrfContext = useContext(CsrfContext)
    return(
        <>
            <main className="dashboard-content-container dashboard-content__overview">
                <header>
                    <div className="dashboard-content__header">
                        <h1>Overview</h1>
                    </div>
                </header>
                {!isLoading && (
                    <>
                        <section className="dashboard-overview__details">
                            <DashboardOverviewControl 
                                selectedYear={year}
                                selectedSemester={semester}
                                yearList={yearList}
                                authContext={authContext}
                                csrfContext={csrfContext}
                                setDashboardData={setDashboardData}
                                setIsLoading={setIsLoading}
                            />
                            {overviewDetailsItems?.map((item, index) => {
                                return(
                                    <DashboardOverviewDetails
                                        header={item.header}
                                        price={item.price}
                                        details={item.details}
                                        key={index}
                                    />
                                )
                            })}
                        </section>     
                        <section className="dashboard-overview__chart-container">
                            <div className="do__chart-months">
                                {monthItems? (monthItems.map((monthItem, index) => {
                                    return(
                                        <MonthItem 
                                            key={index}
                                            month={monthItem.month}
                                            year={monthItem.year}
                                            lowestCategory={monthItem.lowestCategory}
                                            highestCategory={monthItem.highestCategory}
                                            totalSpent={monthItem.totalSpent}
                                        />
                                    )
                                })) : (
                                    <EmptyMonthItem />
                                )}
                            </div>
                            <div className="do__chart-chart">
                                <h1>{year} Overview</h1>
                                <OverviewChart 
                                    overviewData={chartData? chartData : null}
                                    yearOne={year? year : ""}
                                    yearTwo={false}
                                />
                            </div>
                        </section>
                        <DashboardOverviewCategory 
                            categoryOverview={categoryOverview}
                        />
                    </>
                )}
            </main>
        </>
    )
}

export default DashboardOverviewContent