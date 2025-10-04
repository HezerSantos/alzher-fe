import React from "react"
import DashboardAnalyticsInfoLoading from "./dashboardAnalyticsInfoLoading"



interface DashboardAnalyticsInfoItemProps {
    header: string | undefined,
    amountSpent: number | undefined,
    primarySubHeader: string | null | undefined,
    primarySubValue: string | null | undefined,
    secondarySubHeader: string | null | undefined,
    secondarySubValue: string | null | undefined
}

const DashboardAnalyticsInfoItem: React.FC<DashboardAnalyticsInfoItemProps> = (props) => {
    return(
        <>
            <div className="analytics-info__item">
                <p>{props.header}</p>
                <p>
                    {props.header === "Total Transactions"? "" : "$"}
                    {props.amountSpent?.toFixed(2)}
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

interface DashboardAnalyticsInfoType {
    header: string | undefined,
    amountSpent: number | undefined,
    primarySubHeader: string | null | undefined,
    primarySubValue: string | null | undefined,
    secondarySubHeader: string | null | undefined,
    secondarySubValue: string | null | undefined,
}

interface DashboardAnalyticsInfoProps {
    dashboardAnalytics: DashboardAnalyticsInfoType[] | undefined,
    isLoading: boolean
}

const DashboardAnalyticsInfo: React.FC<DashboardAnalyticsInfoProps> = ({dashboardAnalytics, isLoading}) => {
    return(
        <>
            <section className="analytics-info">
                {isLoading? (
                    [...Array(4)].map((_, i) => {
                        return <DashboardAnalyticsInfoLoading key={i}/>
                    })
                ) : (
                    <>
                    {dashboardAnalytics?.map((item, index) => {
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
                    </>
                )}
                
            </section>
        </>
    )
}

export default DashboardAnalyticsInfo