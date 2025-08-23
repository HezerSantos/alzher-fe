import React from "react"



interface DashboardAnalyticsInfoItemProps {
    header: string,
    amountSpent: number,
    primarySubHeader: string | null,
    primarySubValue: string | null,
    secondarySubHeader: string | null,
    secondarySubValue: string | null
}

const dashboardAnalytics = [
  {
    header: "Total Spent",
    amountSpent: 252912,
    primarySubHeader: "Average Category",
    primarySubValue: "Utilities",
    secondarySubHeader: "Highest Category",
    secondarySubValue: "Dining",
  },
  {
    header: "2024 Yearly Spent",
    amountSpent: 52232,
    primarySubHeader: "Highest Category",
    primarySubValue: "Entertainment",
    secondarySubHeader: "Peak Month",
    secondarySubValue: "December",
  },
  {
    header: "Monthly Spent",
    amountSpent: 4532,
    primarySubHeader: "Highest Day",
    primarySubValue: "16th of the month",
    secondarySubHeader: "Lowest Day",
    secondarySubValue: "27th of the month",
  },
  {
    header: "Total Transactions",
    amountSpent: 123234,
    primarySubHeader: null,
    primarySubValue: null,
    secondarySubHeader: null,
    secondarySubValue: null,
  },
];


const DashboardAnalyticsInfoItem: React.FC<DashboardAnalyticsInfoItemProps> = (props) => {
    return(
        <>
            <div className="analytics-info__item">
                <p>{props.header}</p>
                <p>
                    {props.header === "Total Transactions"? "" : "$"}
                    {props.amountSpent}
                </p>
                {props.primarySubValue && (
                    <div>
                        <p>
                            {props.primarySubHeader? props.primarySubHeader : ""} : {props.primarySubValue? props.primarySubValue : ""}
                        </p>
                    </div>
                )}
                {props.secondarySubValue && (
                    <div>
                        <p>
                            {props.secondarySubHeader? props.secondarySubHeader : ""} : {props.secondarySubValue? props.secondarySubValue : ""}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

const DashboardAnalyticsInfo: React.FC = () => {
    return(
        <>
            <section className="analytics-info">
                {dashboardAnalytics.map((item, index) => {
                    return(
                        <DashboardAnalyticsInfoItem 
                            key={index}
                            header={item.header}
                            amountSpent={item.amountSpent}
                            primarySubHeader={item.primarySubHeader}
                            primarySubValue={item.primarySubValue}
                            secondarySubHeader={item.secondarySubHeader}
                            secondarySubValue={item.secondarySubValue}
                        />
                    )
                })}
            </section>
        </>
    )
}

export default DashboardAnalyticsInfo