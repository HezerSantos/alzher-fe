import React, { useContext, useEffect, useState } from "react"
import DashboardContext from "../../context/dashboard/dashboardContext"
import DashboardNav from "../../components/universal/navbar/dashboardNav"
import DashboardMiniNav from "../../components/universal/navbar/dashboardMiniNav"
import SettingsNav from "../../components/settings/settingsNav"
import SettingsContent from "../../components/settings/settingsContent"
import fetchDashboardData from "../../functionHelpers/fetchDashboardData"
import CsrfContext from "../../context/csrf/csrfContext"
import AuthContext from "../../context/auth/authContext"
import ErrorContext from "../../context/error/errorContext"
import SettingsDialog from "../../components/settings/settingsDialog"





interface DashboardDataType {
    email: string
}

interface IsOpenType {
    state: boolean,
    type: "email" | "password" | "",
}

const Settings: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    const csrfContext = useContext(CsrfContext)
    const authContext = useContext(AuthContext)
    const errorContext = useContext(ErrorContext)
    const [ selectedSetting, setSelectedSetting ] = useState("security")
    const [ dashboardData, setDashboardData ] = useState<DashboardDataType | null>(null)
    const [ isOpen, setIsOpen ] = useState<IsOpenType>({state: false, type: ""})
    useEffect(() => {
        fetchDashboardData(csrfContext, authContext, errorContext, setDashboardData, '/settings')
    }, [])
    return(
        <>  
            <SettingsDialog isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className="page-section">
                <div className={`page-section__child dashboard-parent ${dashboardContext?.isHidden? "d-nav__grid-reset" : ""}`}>
                    <DashboardNav />
                    <DashboardMiniNav />
                    <div className="dashboard-settings">
                        <div className="settings-header">
                            <h1>Settings</h1>
                        </div>
                        <SettingsNav selectedSetting={selectedSetting} setSelectedSetting={setSelectedSetting} />
                        <SettingsContent selectedSetting={selectedSetting} email={dashboardData?.email} setIsOpen={setIsOpen}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings