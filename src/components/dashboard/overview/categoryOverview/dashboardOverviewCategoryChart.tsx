import React from "react"
import CategoryOverviewType from "../types/categoryOverviewType"


const categoryColor = new Map([
    ['Dining', '19183B'],
    ['Merchandise', '708993'],
    ['Entertainment', '0d2229'],
    ['Subscriptions', 'A1C2BD'],
    ['Grocery', 'E7F2EF'],
    ['Transportation', 'EEEEEE'],
    ['Bills', 'FFFFFF'],
])

interface CategoryChartProps {
    data: CategoryOverviewType[] | undefined
}

const CategoryChartBar: React.FC<CategoryChartProps> = ({data}) => {
    return(
        <>
            <div className="do__category-bar">
                {data?.map((category, i) => {
                    return(
                        <div key={i} style={{width: `${category.percent}%`, backgroundColor: `#${categoryColor.get(category.name)}`}}></div>
                    )
                })}
            </div>     
        </>
    )
}

const CategoryChartData: React.FC<CategoryChartProps> = ({data}) => {
    return(
        <>
            <div className="do__category-chart-item-container">
                {data?.map((category, i) => {
                    return(
                        <div className="do__category-chart-item" key={i}>
                            <div className="do__category-chart-item-header">
                                <div style={{backgroundColor: `#${categoryColor.get(category.name)}`}}></div>
                                <p>{category.name}</p>
                            </div>
                            <div className="do__category-chart-item-content">
                                <p>
                                    {category.totalTransactions} transactions
                                </p>
                                <p>
                                    {category.percent.toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}


interface CategoryOverview {
    name: string,
    amount: number,
    totalTransactions: number,
    percent: number
}

interface DashboardOverviewCategoryChartProps {
    categoryOverview: CategoryOverview[] | undefined
}
const DashboardOverviewCategoryChart: React.FC<DashboardOverviewCategoryChartProps> = ({categoryOverview}) => {
    return(
        <>
            <div className="do__category-chart">
                <CategoryChartBar 
                    data={categoryOverview}
                />
                <CategoryChartData 
                    data={categoryOverview}
                />
            </div>
        </>
    )
}

export default DashboardOverviewCategoryChart