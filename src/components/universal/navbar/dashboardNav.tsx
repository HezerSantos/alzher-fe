import React, { ReactElement } from "react"
import logo from '/favicon.svg'
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { MdOutlineAnalytics } from "react-icons/md";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { FaFolderPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Location } from 'react-router-dom';
import { FaDoorOpen } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { FaGear } from "react-icons/fa6";
const DNavHeader: React.FC = () => {
    return(
        <>
            <div className="d-nav__header d-nav__child">
                <img src={logo} alt="" />
                <button>
                    <IoChevronBackCircleOutline />
                </button>
            </div>
        </>
    )
}

interface DNavSectionProps {
    header: string,
    sectionChildren: {
        image: ReactElement,
        path: string,
        name: string
    }[],
    location: Location
}
const DNavSection: React.FC<DNavSectionProps> = ({header, sectionChildren, location}) => {
    return(
        <>
            <div className="d-nav__section">
                <h1>{header}</h1>
                {sectionChildren.map((child, index) => {
                    return(
                        <Link
                            to={child.path}
                            key={`S${index}`}
                            className= {`d-nav__section-child ${location.pathname === child.path? "d-nav__selected" : ""}`}
                        >
                            {child.image}
                            <p>{child.name}</p>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

const dashboardTabs = [
    {
        image: <FaHome />,
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
        image: <FaFolderPlus />,
        path: "/dashboard/scan",
        name: "Scan"
    }
]

const generalTabs = [
    {
        image: <FaDoorOpen />,
        path: "/",
        name: "Welcome"
    },
    {
        image: <FaClipboardList />,
        path: "/terms-and-privacy",
        name: "Terms and Privacy"
    },
        {
        image: <HiInformationCircle />,
        path: "/about-us",
        name: "About Us"
    },
]

const systemTabs = [
    {
        image: <FaGear />,
        path: "/dashboard/settings",
        name: "Settings"
    },
    {
        image: <IoIosLogOut />,
        path: "/dashboard/log-out",
        name: "Log Out"
    }, 
]

const DashboardNav: React.FC = () => {
    const location = useLocation()
    return(
        <>
            <nav className="dashboard-nav">
                <div className="dashboard-nav-container">
                       <DNavHeader /> 
                        <DNavSection 
                            header="Dashboard"
                            sectionChildren={dashboardTabs}
                            location={location}
                        />
                        <DNavSection 
                            header="General"
                            sectionChildren={generalTabs}
                            location={location}
                        />
                        <DNavSection 
                            header="System"
                            sectionChildren={systemTabs}
                            location={location}
                        />
                        
                </div>
            </nav>
        </>
    )
}

export default DashboardNav