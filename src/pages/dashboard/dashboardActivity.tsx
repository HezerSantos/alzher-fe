import React, { useContext, useState, useRef, useEffect, useCallback } from 'react'
import '../../assets/styles/dashboard/dashboard.css'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
import DashboardContext from '../../context/dashboard/dashboardContext'
import DashboardMiniNav from '../../components/universal/navbar/dashboardMiniNav';
import { useNavigate, useSearchParams } from 'react-router-dom';
import fetchDashboardData from '../../functionHelpers/fetchDashboardData';
import CsrfContext from '../../context/csrf/csrfContext';
import AuthContext from '../../context/auth/authContext';
import ActivityInputHeader from '../../components/dashboard/activity/activityInputHeader';
import ExpandedTransactionForm from '../../components/dashboard/activity/expandedTransactionForm/expandedTransactionForm';
import TransactionContainer from '../../components/dashboard/activity/transactionContainer';

//Interface for the basis of the transaction object
interface SelectedTransactionItemType {
    transactionId: string,
    category: string,
    description: string,
    transactionDate: string,
    transactionAmount: number
}


interface TransactionDataType {
    transactionId: string,  
    category: string,
    description: string,
    transactionDate: string,
    transactionAmount: number
}

interface ActivityDataType {
    nextPageFlag: boolean,
    previousPageFlag: boolean,
    transactionData: TransactionDataType[]
}

interface ActivityNavigationButtonProps {
    type: 'next' | 'prev',
    isActive: boolean | null
}

const ActivityNavigationButton: React.FC<ActivityNavigationButtonProps> = ({type, isActive}) => {
    const [ searchParams ] = useSearchParams()
    const navigate = useNavigate()
    const handleQueryPage = useCallback(() => {
        switch(type){
            case "next": {
                const page = Number(searchParams.get("page")) + 1
                const pageSize = searchParams.get("pageSize")
                navigate(`/dashboard/activity?page=${page}&pageSize=${pageSize}`)
                break
            }
            case "prev": {
                const page = Number(searchParams.get("page")) - 1
                const pageSize = searchParams.get("pageSize")
                navigate(`/dashboard/activity?page=${page}&pageSize=${pageSize}`)
                break
            }
        }   
    }, [searchParams, navigate, type])
    return(
        <>
            <button 
                disabled={!isActive} 
                className={`${isActive? "" : "activity-button__hidden activity-button"}`}
                onClick={() => handleQueryPage()}
            >
                {type}
            </button>
        </>
    )
}

const DashboardActivity: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    const csrfContext = useContext(CsrfContext)
    const authContext = useContext(AuthContext)

    const [ filterToggle, setFilterToggle ] = useState(false)
    const [ selectedTransactionItem, setSelectedTransactionItem ] = useState<SelectedTransactionItemType | null>(null)
    const [isExpandedOpen, setIsExpandedOpen] = useState<boolean>(false)
    const [ transactionData, setTransactionData ] = useState<Map<string, SelectedTransactionItemType> | null>(null)
    const [ dashboardData, setDashboardData ] = useState<ActivityDataType | null>(null)

    const transactionContainerRef = useRef<HTMLFormElement>(null);
    const toggleFiltersButton = useRef<HTMLButtonElement>(null)

    const [ searchParams ] = useSearchParams()
    const navigate = useNavigate()


    useEffect(() => {
        const newTransactionData = dashboardData?.transactionData.map(data => [data.transactionId, data] as [string, SelectedTransactionItemType])
        const newTransactionDataMap = new Map(newTransactionData)
        setTransactionData(newTransactionDataMap)
    }, [dashboardData])

    useEffect(() => {
        if(!searchParams.get("page") || !searchParams.get("pageSize")){
            navigate("/dashboard/activity?page=1&pageSize=10")
        }
        const page = searchParams.get("page") || "1"
        const pageSize = searchParams.get("pageSize") || "10"

        const body = {
            page,
            pageSize
        }

        fetchDashboardData(csrfContext, authContext, setDashboardData, "/activity", body, null)
    }, [searchParams])

    return(
        <>
            <div className="page-section">
                <div className={`page-section__child dashboard-parent ${dashboardContext?.isHidden? "d-nav__grid-reset" : ""}`}>
                    <DashboardNav />
                    <DashboardMiniNav />
                    <div className='dashboard__activity-container'>
                        <ExpandedTransactionForm 
                            selectedTransactionItem={selectedTransactionItem}
                            isExpandedOpen={isExpandedOpen}
                            setIsExpandedOpen={setIsExpandedOpen}
                            setTransactionData={setTransactionData}
                        />
                        {/* END OF FORM */}
                        <div className='activity-header'>
                            <h1>
                                Activity
                            </h1>
                        </div>
                        {/* DONE */}
                        <ActivityInputHeader 
                            toggleFiltersButton={toggleFiltersButton}
                            setFilterToggle={setFilterToggle}
                            filterToggle={filterToggle}
                        />
                         {/* END */}
                        <TransactionContainer 
                            setSelectedTransactionItem={setSelectedTransactionItem}
                            setIsExpandedOpen={setIsExpandedOpen}
                            transactionData={transactionData? [...transactionData.values()] : []}
                            transactionContainerRef={transactionContainerRef}
                        />
                        <div className='activity-button__container'>
                            <ActivityNavigationButton 
                                type='prev'
                                isActive={dashboardData?.previousPageFlag || null}
                            />
                            <ActivityNavigationButton 
                                type='next'
                                isActive={dashboardData?.nextPageFlag || null}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardActivity