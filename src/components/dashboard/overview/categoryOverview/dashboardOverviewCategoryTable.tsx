import React from "react"
import DashboardOverviewCategoryItem from "./dashboardOverviewCategoryItem"
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


interface DashboardOverviewCategoryTableProps {
    categoryOverview: CategoryOverviewType[] | undefined
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