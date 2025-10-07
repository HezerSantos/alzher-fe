import React, { ReactElement, useContext } from "react"
import logo from '/favicon.svg'
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";
import { TbActivityHeartbeat } from "react-icons/tb";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Location } from 'react-router-dom';
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { TiClipboard } from "react-icons/ti";
import { IoIosLogOut } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
import DashboardContext from "../../../context/dashboard/dashboardContext";

type toggleDashboardNavType = (dashboardContext: DashboardContextType | null) => void

const toggleDashboardNav: toggleDashboardNavType = (dashboardContext) => {
    dashboardContext?.setIsHidden(prev => !prev)
}

interface DNavHeaderProps {
    dashboardContext: DashboardContextType | null
}

const DNavHeader: React.FC<DNavHeaderProps> = ({dashboardContext}) => {
    return(
        <>
            <div className={`d-nav__header d-nav__child ${dashboardContext?.isHidden? "d-nav__padding-reset" : ""}`}>
                <img src={logo} alt="" className={`${dashboardContext?.isHidden? "d-nav__hidden" : ""}`} />
                <p className={`${dashboardContext?.isHidden? "d-nav__hidden" : ""}`} >Alzher</p>
                <button 
                    onClick={() => toggleDashboardNav(dashboardContext)} 
                    className={`d-nav__button ${dashboardContext?.isHidden? "d-nav__padding-reset d-nav__rotate" : ""}`}
                >
                    <IoChevronBackCircleOutline />
                </button>
            </div>
        </>
    )
}

interface DashboardContextType {
    isHidden: boolean,
    setIsHidden: React.Dispatch<React.SetStateAction<boolean>>
}

interface DNavSectionProps {
    header: string,
    sectionChildren: {
        image: ReactElement,
        path: string,
        name: string
    }[],
    location: Location,
    dashboardContext: DashboardContextType | null
}
const DNavSection: React.FC<DNavSectionProps> = ({header, sectionChildren, location, dashboardContext}) => {
    return(
        <>
            <div className="d-nav__section">
                <h1 className={`${dashboardContext?.isHidden? "d-nav__hidden" : ""}`}>{header}</h1>
                {sectionChildren.map((child, index) => {
                    return(
                        <Link
                            to={child.path}
                            key={`S${index}`}
                            className= 
                            {
                                `d-nav__section-child ${location.pathname === child.path? "d-nav__selected" : ""} ${dashboardContext?.isHidden? "d-nav__padding-reset" : ""}`
                            }
                        >
                            {child.image}
                            <p className={`${dashboardContext?.isHidden? "d-nav__hidden" : ""}`}>{child.name}</p>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

const dashboardTabs = [
    {
        image: <MdOutlineDashboard />,
        path: "/dashboard",
        name: "Overview"
    },
    {
        image: <MdOutlineAnalytics />,
        path: "/dashboard/analytics",
        name: "Analytics"
    },
        {
        image: <TbActivityHeartbeat />,
        path: "/dashboard/activity",
        name: "Activity"
    },
        {
        image: <FaRegFilePdf />,
        path: "/dashboard/scan",
        name: "Scan"
    }
]

const generalTabs = [
    {
        image: <MdOutlineMapsHomeWork />,
        path: "/",
        name: "Welcome"
    },
    {
        image: <TiClipboard />,
        path: "/terms-and-privacy",
        name: "Terms and Privacy"
    }
]

const systemTabs = [
    {
        image: <FaGear />,
        path: "/dashboard/settings",
        name: "Settings"
    },
    {
        image: <IoIosLogOut />,
        path: "/logout",
        name: "Log Out"
    }, 
]

const DashboardNav: React.FC = () => {
    const location = useLocation()
    const dashboardContext = useContext(DashboardContext)
    return(
        <>
            <nav className={`dashboard-nav ${dashboardContext?.isHidden? "d-nav__shrink" : ""}`}>
                <div className="dashboard-nav-container">
                       <DNavHeader 
                        dashboardContext={dashboardContext}
                       /> 
                        <DNavSection 
                            header="Dashboard"
                            sectionChildren={dashboardTabs}
                            location={location}
                            dashboardContext={dashboardContext}
                        />
                        <DNavSection 
                            header="General"
                            sectionChildren={generalTabs}
                            location={location}
                            dashboardContext={dashboardContext}
                        />
                        <DNavSection 
                            header="System"
                            sectionChildren={systemTabs}
                            location={location}
                            dashboardContext={dashboardContext}
                        />
                        
                </div>
            </nav>
        </>
    )
}

export default DashboardNav