interface DashboardOverviewCategoryItemProps {
    category: string,
    amount: number,
    color: string | undefined
}

const DashboardOverviewCategoryItem: React.FC<DashboardOverviewCategoryItemProps> = ({category, amount, color}) => {
    return(
        <>
            <tr>
                <td className="do__category-table-category">
                    <div style={{backgroundColor: `#${color}`}}></div> {category}
                </td>
                <td>
                    ${amount.toFixed(2)}
                </td>
            </tr>
        </>
    )
}


export default DashboardOverviewCategoryItem