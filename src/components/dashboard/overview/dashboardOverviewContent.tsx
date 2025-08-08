import React from "react"

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

const DashboardOverviewContent: React.FC = () => {
    return(
        <>
            <div className="dashboard-content-container">
                <div className="dashboard-content__header">
                    <h1>Overview</h1>
                </div>
                <div className="dashboard-overview__details">
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
                </div>
            </div>
        </>
    )
}

export default DashboardOverviewContent