import React, { useContext, useState, useRef, useEffect, useCallback } from 'react'
import '../../assets/styles/dashboard/dashboard.css'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
import DashboardContext from '../../context/dashboard/dashboardContext'
import DashboardMiniNav from '../../components/universal/navbar/dashboardMiniNav';
import { useNavigate, useSearchParams } from 'react-router-dom';
import fetchDashboardData from '../../functionHelpers/fetchDashboardData';
import ActivityInputHeader from '../../components/dashboard/activity/activityInputHeader';
import ExpandedTransactionForm from '../../components/dashboard/activity/expandedTransactionForm/expandedTransactionForm';
import TransactionContainer from '../../components/dashboard/activity/transactionContainer';
import LoadingScreen from '../helpers/loadingScreen';
import NotLoggedIn from '../helpers/notLoggedIn'
import useGlobalContext from '../../customHooks/useContexts';
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
                const categoryFilter = searchParams.get("categoryFilter")
                navigate(`/dashboard/activity?page=${page}&pageSize=${pageSize}${categoryFilter? `&categoryFilter=${categoryFilter}` : ""}${searchParams.get('keyWord')? `&keyWord=${searchParams.get('keyWord')}` : ``}`)
                break
            }
            case "prev": {
                const page = Number(searchParams.get("page")) - 1
                const pageSize = searchParams.get("pageSize")
                const categoryFilter = searchParams.get("categoryFilter")
                navigate(`/dashboard/activity?page=${page}&pageSize=${pageSize}${categoryFilter? `&categoryFilter=${categoryFilter}` : ""}${searchParams.get('keyWord')? `&keyWord=${searchParams.get('keyWord')}` : ``}`)
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
    const globalContext = useGlobalContext()

    const [ filterToggle, setFilterToggle ] = useState(false)
    const [ selectedTransactionItem, setSelectedTransactionItem ] = useState<SelectedTransactionItemType | null>(null)
    const [isExpandedOpen, setIsExpandedOpen] = useState<boolean>(false)
    const [ transactionData, setTransactionData ] = useState<Map<string, SelectedTransactionItemType> | null>(null)
    const [ dashboardData, setDashboardData ] = useState<ActivityDataType | null>(null)
    const [ isLoading, setIsLoading ] = useState(false)

    const transactionContainerRef = useRef<HTMLFormElement>(null);
    const toggleFiltersButton = useRef<HTMLButtonElement>(null)

    const [ searchParams ] = useSearchParams()
    const navigate = useNavigate()


    useEffect(() => {
        const newTransactionData = dashboardData?.transactionData?.map(data => [data.transactionId, data] as [string, SelectedTransactionItemType])
        const newTransactionDataMap = new Map(newTransactionData)
        setTransactionData(newTransactionDataMap)
    }, [dashboardData])

    useEffect(() => {
        if(!searchParams.get("page") || !searchParams.get("pageSize")){
            navigate("/dashboard/activity?page=1&pageSize=10")
        }
        const page = searchParams.get("page") || "1"
        const pageSize = searchParams.get("pageSize") || "10"
        const categoryFilter = searchParams.get("categoryFilter")
        const keyWord = searchParams.get("keyWord")
        const body = {
            page,
            pageSize,
            categoryFilter,
            keyWord
        }

        fetchDashboardData(globalContext, setDashboardData, "/activity", body, null, setIsLoading)
    }, [searchParams])

    return(
        globalContext.auth?.isAuthState.isAuthLoading? (
            <LoadingScreen />
        ) : (
            <>
                {globalContext.auth?.isAuthState.isAuth? (
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
                                <div className='activity-header'>
                                    <h1>
                                        Activity
                                    </h1>
                                </div>
                                <ActivityInputHeader 
                                    toggleFiltersButton={toggleFiltersButton}
                                    setFilterToggle={setFilterToggle}
                                    filterToggle={filterToggle}
                                    setIsLoading={setIsLoading}
                                />
                                <TransactionContainer 
                                    setSelectedTransactionItem={setSelectedTransactionItem}
                                    setIsExpandedOpen={setIsExpandedOpen}
                                    transactionData={transactionData? [...transactionData.values()] : []}
                                    transactionContainerRef={transactionContainerRef}
                                    isLoading={isLoading}
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
                ) : (
                    <NotLoggedIn />
                )}
            </>
        )

    )
}

export default DashboardActivity