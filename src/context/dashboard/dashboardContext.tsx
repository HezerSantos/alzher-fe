import React, { createContext } from "react";

interface DashboardContextType {
    isHidden: boolean,
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
}

const DashboardContext = createContext<DashboardContextType | null>(null)

export default DashboardContext