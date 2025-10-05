import React from "react"
import DashboardOverviewCategoryItem from "./dashboardOverviewCategoryItem"
const categoryColor = new Map([
    ['Dining', '19183B'],
    ['Leisure', '708993'],
    ['Subscriptions', 'A1C2BD'],
    ['Grocery', 'E7F2EF'],
    ['Transportation', 'EEEEEE'],
    ['Living Expenses', 'FFFFFF'],
])


interface CategoryTableProps {
    children: React.ReactNode
}

const CategoryTable: React.FC<CategoryTableProps> = ({children}) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>
                            Category
                        </th>
                        <th>
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </>
    )
}

interface CategoryOverview {
    name: string,
    amount: number,
    totalTransactions: number,
    percent: number
}

interface DashboardOverviewCategoryTableProps {
    categoryOverview: CategoryOverview[] | undefined
}

const DashboardOverviewCategoryTable: React.FC<DashboardOverviewCategoryTableProps> = ({categoryOverview}) => {


    return(
        <>
            <div className="do__category-table-container">
                <CategoryTable>
                    {categoryOverview?.map((category, index) => {
                        return(
                            <DashboardOverviewCategoryItem 
                                key={index}
                                category={category.name}
                                amount={category.amount}
                                color={categoryColor.get(category.name)}
                            />
                        )
                    })}
                    
                </CategoryTable>
            </div>
        </>
    )
}

export default DashboardOverviewCategoryTable