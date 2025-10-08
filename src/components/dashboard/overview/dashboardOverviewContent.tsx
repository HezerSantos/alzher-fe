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
    isLoading: boolean | undefined
}



const DashboardOverviewContent: React.FC<DashboardOverviewContentProps> = ({year, semester, overviewDetailsItems, chartData, monthItems, yearList, categoryOverview, setDashboardData, isLoading}) => {
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
                    <>
                        <section className="dashboard-overview__details">
                            {!isLoading? (
                                <>
                                <DashboardOverviewControl 
                                    selectedYear={year}
                                    selectedSemester={semester}
                                    yearList={yearList}
                                    authContext={authContext}
                                    csrfContext={csrfContext}
                                    setDashboardData={setDashboardData}
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
                                </>
                            ) : (
                                [...Array(4)].map((_, i) => {
                                    return(
                                        <div className="do-header-loading" key={i}></div>
                                    )
                                })
                            )}

                        </section>     
                        <section className="dashboard-overview__chart-container">
                            <div className="do__chart-months">
                                {!isLoading? (
                                    monthItems? (monthItems.map((monthItem, index) => {
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
                                    )
                                ) : (
                                    [...Array(6)].map((_, i) => {
                                        return(
                                            <div className="do-month-item-loading" key={i}></div>
                                        )
                                    })
                                )}
                            </div>
                            <div className="do__chart-chart">
                                <h1> {year} Overview</h1>
                                {!isLoading? (
                                    <OverviewChart 
                                        overviewData={chartData? chartData : null}
                                        yearOne={year? year : ""}
                                        yearTwo={false}
                                    />
                                ) : (
                                    <div className="do-chart-loading"></div>
                                )}
                            </div>
                        </section>
                        <DashboardOverviewCategory 
                            year={year}
                            categoryOverview={categoryOverview}
                        />
                    </>
            </main>
        </>
    )
}

export default DashboardOverviewContent