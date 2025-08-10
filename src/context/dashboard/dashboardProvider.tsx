import React, { ReactNode, useEffect, useState } from "react"
import DashboardContext from "./dashboardContext"
interface DashboardProviderProps {
    children: ReactNode
}

const DashboardProvider: React.FC<DashboardProviderProps> = ({children}) => {
    const [isHidden, setIsHidden ] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 950) {
                setIsHidden(true);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return(
        <DashboardContext.Provider value={{isHidden, setIsHidden}}>
            {children}
        </DashboardContext.Provider>
    )
} 

export default DashboardProvider