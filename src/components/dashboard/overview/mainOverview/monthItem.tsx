import { IoCloseOutline } from "react-icons/io5";
import { BsArrowsAngleExpand } from "react-icons/bs";

import { useState } from "react";
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
                        {isOpen? (
                            <IoCloseOutline />
                        ) : (
                            <BsArrowsAngleExpand />
                        )}
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

export const EmptyMonthItem: React.FC = () => {
    return(
        <>
            <div className="do-month-item do-month-item-empty">
                No Data Availiable
            </div>
        </>
    )
}

export default MonthItem