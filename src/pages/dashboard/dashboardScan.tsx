import React, { useContext, useEffect, useState } from 'react'
import '../../assets/styles/dashboard/dashboard.css'
import DashboardMiniNav from '../../components/universal/navbar/dashboardMiniNav'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
import DashboardContext from '../../context/dashboard/dashboardContext'
import LoadingScreen from '../helpers/loadingScreen'
import NotLoggedIn from '../helpers/notLoggedIn'
import AlzherMessage from '../../components/universal/alzherMessage'
import ScanHeader from '../../components/dashboard/scan/scanHeader'
import ScanForm from '../../components/dashboard/scan/scanForm'
import FileContainer from '../../components/dashboard/scan/fileContainer'
import useGlobalContext from '../../customHooks/useContexts'


const DashboardScan: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    const globalContext = useGlobalContext()
    const [ fileList, setFileList ] = useState<Map<string, File>>(new Map())
    const [ isMessage, setIsMessage ] = useState({error: false, ok: false})
    const [ isLoading, setIsLoading ] = useState(false)
    useEffect(() => {
        const fetchData = async() => {
            await globalContext.auth?.refresh() 
        }

        if(!globalContext.auth?.isAuthState.isAuth){
            fetchData()
        }
    }, [])

    useEffect(() => {
        let timeout: NodeJS.Timeout

        if(isMessage.error || isMessage.ok){
            timeout = setTimeout(() => {
                setIsMessage({error: false, ok: false})
            }, 5000)
        }
        if(isMessage.ok){
            setFileList(new Map())
        }

        return () => {
            if (timeout) clearTimeout(timeout)
        }
    }, [isMessage])


    return(
        <>
            {globalContext.auth?.isAuthState.isAuthLoading? (
                <>
                    <LoadingScreen />
                </>
            ) : (
                globalContext.auth?.isAuthState.isAuth? (
                    <div className="page-section">
                        <div className={`page-section__child dashboard-parent ${dashboardContext?.isHidden? "d-nav__grid-reset" : ""}`}>
                            {isMessage.error && (
                                <AlzherMessage msg='Unable to process statement' error={true}/>
                            )}
                            {isMessage.ok && (
                                <AlzherMessage msg='Successfully processed statement' error={false}/>
                            )}
                            <DashboardNav />
                            <DashboardMiniNav />
                            <div className='scan-container'>
                                <ScanHeader />
                                <ScanForm setFileList={setFileList}/>
                                <FileContainer 
                                    fileList={fileList}
                                    setFileList={setFileList}
                                    setIsMessage={setIsMessage}
                                    setIsLoading={setIsLoading}
                                    isLoading={isLoading}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <NotLoggedIn />
                    </>
                )
            )}
        </>
    )
}

export default DashboardScan