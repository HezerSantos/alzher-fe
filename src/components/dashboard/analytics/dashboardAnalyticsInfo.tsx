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
    header: 'Total Spent',
    amountSpent: 5814.599999999994,
    primarySubHeader: 'Frequent Category',
    primarySubValue: 'Dining',
    secondarySubHeader: 'Largest Expense',
    secondarySubValue: 'Leisure'
  },
  {
    header: 'Yearly Average',
    amountSpent: 2907.2999999999993,
    primarySubHeader: 'Peak Month',
    primarySubValue: 'Dec',
    secondarySubHeader: null,
    secondarySubValue: null
  },
  {
    header: 'Monthly Average',
    amountSpent: 528.5999999999999,
    primarySubHeader: 'Highest Day',
    primarySubValue: '13 of the month',
    secondarySubHeader: 'Lowest Day',
    secondarySubValue: '31 of the month'
  },
  {
    header: 'Total Transactions',
    amountSpent: 284,
    primarySubHeader: null,
    primarySubValue: null,
    secondarySubHeader: null,
    secondarySubValue: null
  }
]


const DashboardAnalyticsInfoItem: React.FC<DashboardAnalyticsInfoItemProps> = (props) => {
    return(
        <>
            <div className="analytics-info__item">
                <p>{props.header}</p>
                <p>
                    {props.header === "Total Transactions"? "" : "$"}
                    {props.amountSpent.toFixed(2)}
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