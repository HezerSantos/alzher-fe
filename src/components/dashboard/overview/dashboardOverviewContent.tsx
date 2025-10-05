import React, { SetStateAction, useContext, useState } from "react"
import { IoCloseOutline } from "react-icons/io5";
import OverviewChart from "./charts/overviewChart";
import { BsArrowsAngleExpand } from "react-icons/bs";
import AuthContext from "../../../context/auth/authContext";
import CsrfContext from "../../../context/csrf/csrfContext";
import fetchDashboardData from "../../../functionHelpers/fetchDashboardData";
import DashboardOverviewCategory from "./categoryOverview/dashboardOverviewCategory";
import CategoryOverviewType from "./types/categoryOverviewType";
interface DashboardOverviewDetailsProps {
    header: string,
    price: number,
    details?: {
        heading: string,
        value: string
    }[]
}

const DashboardOverviewDetails: React.FC<DashboardOverviewDetailsProps> = ({header, price, details}) => {
    return(
        <>
            <div className="dashboard-overview__details-item">
                <h1>{header}</h1>
                <p className="do__details-item__price">$ {price}</p>
                {details?.map((detail, index) => {
                    return(
                        <p
                        key={index}
                        className="do__details-item__detail"
                        >
                            {detail.heading}: {detail.value}
                        </p>
                    )
                })}
            </div>
        </>
    )
}

interface DashboardOverviewControlProps {
    selectedYear: string | undefined,
    selectedSemester: number | undefined,
    yearList: string[] | undefined,
    csrfContext: CsrfContextType | null,
    authContext: AuthContextType | null,
    setDashboardData: React.Dispatch<SetStateAction<DashboardOverviewContentType | null>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
}

type HandleDashboardOverviewType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    queryDetails: {year: string | undefined, semester: number},
    setQueryDetails: React.Dispatch<SetStateAction<{year: string | undefined, semester: number}>>,
    csrfContext: CsrfContextType | null,
    authContext: AuthContextType | null,
    setDashboardData: React.Dispatch<SetStateAction<DashboardOverviewContentType | null>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
) => void

type HandleDashboardOverviewClickType = (
    semester: number,
    queryDetails: {year: string | undefined, semester: number},
    setQueryDetails: React.Dispatch<SetStateAction<{year: string | undefined, semester: number}>>,
    csrfContext: CsrfContextType | null,
    authContext: AuthContextType | null,
    setDashboardData: React.Dispatch<SetStateAction<DashboardOverviewContentType | null>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
) => void

const handleDashboardOverview: HandleDashboardOverviewType = async(e, queryDetails, setQueryDetails, csrfContext, authContext, setDashboardData, setIsLoading) => {
    const newYear = e.target.value
    const body = {
        year: newYear,
        semester: queryDetails.semester
    }

    await fetchDashboardData(csrfContext, authContext, setDashboardData, "overview", body, null, setIsLoading)
    setQueryDetails(body)
}

const handleDashboardOverviewClick:HandleDashboardOverviewClickType = async(semester, queryDetails, setQueryDetails, csrfContext, authContext, setDashboardData, setIsLoading) => {
    const body = {
        year: queryDetails.year,
        semester: semester
    }

    await fetchDashboardData(csrfContext, authContext, setDashboardData, "overview", body, null, setIsLoading)
    setQueryDetails(body)
} 
const DashboardOverviewControl: React.FC<DashboardOverviewControlProps> = ({selectedYear, selectedSemester, yearList, csrfContext, authContext, setDashboardData, setIsLoading}) => {
    
    const [ queryDetails, setQueryDetails ] = useState({year: selectedYear, semester: 1})

    return(
        <>
            {yearList&& (
                <div className="dashboard-overview__control">
                    <select 
                        onChange={(e) => handleDashboardOverview(e, queryDetails, setQueryDetails, csrfContext, authContext, setDashboardData, setIsLoading)}
                        value={selectedYear}
                    >
                        {yearList.map((year, index) => {
                            return <option 
                                        key={index} 
                                        value={year}
                                    >
                                        {year}
                                    </option>
                        })}
                    </select>
                    <button 
                        onClick={() => handleDashboardOverviewClick(1, queryDetails, setQueryDetails, csrfContext, authContext, setDashboardData, setIsLoading)}
                        className={selectedSemester === 1? "selected-semester" : ""}
                        disabled={selectedSemester === 1}
                    >
                        First Six Months
                    </button>
                    <button 
                        onClick={() => handleDashboardOverviewClick(2, queryDetails, setQueryDetails, csrfContext, authContext, setDashboardData, setIsLoading)}
                        className={selectedSemester === 2? "selected-semester" : ""}
                        disabled={selectedSemester === 2}
                    >
                        Last Six Months
                    </button>
                </div>
            )}
        </>
    )
}


interface MonthItemProps {
    month: string,
    year: number,
    lowestCategory: string,
    highestCategory: string,
    totalSpent: number
}

const MonthItem: React.FC<MonthItemProps> = ({month, year, lowestCategory, highestCategory, totalSpent}) => {
    const [ isOpen, setIsOpen ] = useState(false)
    return(
        <>
            <div className="do-month-item">
                <div>
                    <p>{month} {year}</p>
                    <button onClick={() => setIsOpen(prev => !prev)}>
                        {isOpen? (
                            <IoCloseOutline />
                        ) : (
                            <BsArrowsAngleExpand />
                        )}
                    </button>
                </div>
                <ul className={`${isOpen? "" : "hide-month-item"}`}>
                    <li>
                        <p>
                            Lowest Category
                        </p>
                        <div className="do-month-item__line"></div>
                        <p>{lowestCategory}</p>
                    </li>
                    <li>
                        <p>
                            Highest Category
                        </p>
                        <div className="do-month-item__line"></div>
                        <p>{highestCategory}</p>
                    </li>
                    <li>
                        <p>
                            Total Spent
                        </p>
                        <div className="do-month-item__line"></div>
                        <p>${totalSpent}</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

const EmptyMonthItem: React.FC = () => {
    return(
        <>
            <div className="do-month-item do-month-item-empty">
                No Data Availiable
            </div>
        </>
    )
}


interface OverviewDetailsItemsType {
    header: string,
    price: number,
    details?: {
        heading: string,
        value: string
    }[]
}

interface ChartDataType {
    month: string,
    [year: `${number}`]: number | undefined;
}

interface MonthItemsType {
    month: string,
    year: number,
    lowestCategory: string,
    highestCategory: string,
    totalSpent: number
}




interface DashboardOverviewContentType {
    year: string | undefined,
    semester: number | undefined,
    overviewDetailsItems: OverviewDetailsItemsType[] | undefined,
    chartData: ChartDataType[] | undefined,
    monthItems: MonthItemsType[] | undefined,
    yearList: string[] | undefined,
    categoryOverview: CategoryOverviewType[] | undefined
}

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