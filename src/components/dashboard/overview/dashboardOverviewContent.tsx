import React, { useState } from "react"
import { IoCloseOutline } from "react-icons/io5";
interface DashboardOverviewDetailsProps {
    header: string,
    price: number,
    details: {
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
                {details.map((detail, index) => {
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

const DashboardOverviewControl: React.FC = () => {
    return(
        <>
            <div className="dashboard-overview__control">
                <button>
                    Year: 2024
                </button>
                <button>
                    First Six Months
                </button>
                <button>
                    Last Six Months
                </button>
            </div>
        </>
    )
}

const dashboardOverviewDetailsItems = [
    {
        header: "Total Spent",
        price: 252912,
        details: [
            {
                heading: "Peak Month",
                value: "December"
            },
            {
                heading: "Highest Category",
                value: "Dining"
            } 
        ]
    },
    {
    header: "Yearly Spent",
    price: 52232,
    details: [
        {
            heading: "Average Category",
            value: "Utilities"
        },
        {
            heading: "Highest Category",
            value: "Entertainment"
        } 
    ]
    },
    {
        header: "Monthly Spent",
        price: 4532,
        details: [
            {
                heading: "Highest Day",
                value: "16th of the month"
            },
            {
                heading: "Lowest Day",
                value: "27th of the month"
            } 
        ]
    }
]


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
                        <IoCloseOutline />
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


const monthItemDemo = [
    {
        month: "January",
        year: 2025,
        lowestCategory: "Entertainment",
        highestCategory: "Dining",
        totalSpent: 20342
    },
    {
        month: "February",
        year: 2025,
        lowestCategory: "Travel",
        highestCategory: "Groceries",
        totalSpent: 18560
    },
    {
        month: "March",
        year: 2025,
        lowestCategory: "Subscriptions",
        highestCategory: "Rent",
        totalSpent: 22010
    },
    {
        month: "April",
        year: 2025,
        lowestCategory: "Health",
        highestCategory: "Dining",
        totalSpent: 19750
    },
    {
        month: "May",
        year: 2025,
        lowestCategory: "Utilities",
        highestCategory: "Entertainment",
        totalSpent: 21025
    },
    {
        month: "June",
        year: 2025,
        lowestCategory: "Groceries",
        highestCategory: "Travel",
        totalSpent: 23330
    }
];



const DashboardOverviewContent: React.FC = () => {
    return(
        <>
            <main className="dashboard-content-container dashboard-content__overview">
                <header>
                    <div className="dashboard-content__header">
                        <h1>Overview</h1>
                    </div>
                </header>
                <section className="dashboard-overview__details">
                    <DashboardOverviewControl />
                    {dashboardOverviewDetailsItems.map((item, index) => {
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
                        {monthItemDemo.map((monthItem, index) => {
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
                        })}
                    </div>
                </section>
            </main>
        </>
    )
}

export default DashboardOverviewContent