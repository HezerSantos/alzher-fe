import { ReactNode, useState } from "react"
import DashboardContext from "./dashboardContext"
interface DashboardProviderProps {
    children: ReactNode
}
const DashboardProvider: React.FC<DashboardProviderProps> = ({children}) => {
    const [isHidden, setIsHidden ] = useState(false)
    return(
        <DashboardContext.Provider value={{isHidden, setIsHidden}}>
            {children}
        </DashboardContext.Provider>
    )
} 

export default DashboardProvider