import React from "react"


const categoryColor = new Map([
    ['dining', '19183B'],
    ['leisure', '708993'],
    ['subscriptions', 'A1C2BD'],
    ['grocery', 'E7F2EF'],
    ['transportation', 'EEEEEE'],
])

interface CategoryChartProps {
    data: {
        name: string,
        percent: number,
        transactions: number
    }[]
}

const CategoryChartBar: React.FC<CategoryChartProps> = ({data}) => {
    return(
        <>
            <div className="do__category-bar">
                {data.map((category, i) => {
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
                {data.map((category, i) => {
                    return(
                        <div className="do__category-chart-item" key={i}>
                            <div className="do__category-chart-item-header">
                                <div style={{backgroundColor: `#${categoryColor.get(category.name)}`}}></div>
                                <p>{category.name}</p>
                            </div>
                            <div className="do__category-chart-item-content">
                                <p>
                                    {category.transactions} transactions
                                </p>
                                <p>
                                    {category.percent}%
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

const DashboardOverviewCategoryChart: React.FC = () => {
    const total = 500
    const category = [
    { name: 'dining', total: 120, transactions: 20 },
    { name: 'leisure', total: 85, transactions: 20 },
    { name: 'subscriptions', total: 70, transactions: 20 },
    { name: 'grocery', total: 95, transactions: 20 },
    { name: 'transportation', total: 130, transactions: 20 }
    ];

    const percentages = category.map((category) => {
        return {
            name: category.name,
            percent: Math.floor((category.total / total) * 100),
            transactions: category.transactions
        }
    }).sort((a, b) => b.percent - a.percent)
    return(
        <>
            <div className="do__category-chart">
                <CategoryChartBar 
                    data={percentages}
                />
                <CategoryChartData 
                    data={percentages}
                />
            </div>
        </>
    )
}

export default DashboardOverviewCategoryChart