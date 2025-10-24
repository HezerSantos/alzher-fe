import { useRef } from "react";
import { Link } from "react-router-dom"
import { CiUser } from "react-icons/ci";
type ToggleMiniNavType = (miniNav: HTMLDivElement | null) => void
const toggleMiniNav: ToggleMiniNavType = (miniNav) => {
    if(miniNav){
        miniNav.classList.toggle("toggle-nav-animation")
    }
}

const DashboardMiniNav: React.FC = () => {
    const miniNav = useRef<HTMLDivElement | null>(null)
    return(
        <>
            <nav className="page-section dashboard-nav-wrapper">
                <div className="page-section__child dashboard-mini-basis">
                    <div>
                        <button className="index-sidenav-toggle" onClick={() => toggleMiniNav(miniNav.current)}>
                            <div>

                            </div>
                            <div>
                                
                            </div>
                        </button>
                        <img src="/favicon.svg" alt="alzher logo" />
                        <div>
                            <Link to={""}> 
                                <CiUser />
                                <p>Log Out</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div ref={miniNav} className="page-section__child dashboard-mini-nav">
                    <ul>
                        <li>
                            <Link to={"/dashboard"}>Overview</Link>
                        </li>
                        <li>
                            <Link to={"/dashboard/analytics"}>Analytics</Link>
                        </li>
                        <li>
                            <Link to={"/dashboard/activity"}>Activity</Link>
                        </li>
                        <li>
                            <Link to={"/dashboard/scan"}>Scan</Link>
                        </li>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link to={"/terms-and-privacy"}>Terms and Privacy</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default DashboardMiniNav