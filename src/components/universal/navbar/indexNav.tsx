import { Link } from "react-router-dom"
import { CiUser } from "react-icons/ci";
import { useRef } from "react";

type ToggleMiniNavType = (miniNav: HTMLDivElement | null) => void
const toggleMiniNav: ToggleMiniNavType = (miniNav) => {
    if(miniNav){
        miniNav.classList.toggle("toggle-nav-animation")
    }
}
const IndexNav: React.FC = () => {
    const miniNav = useRef<HTMLDivElement | null>(null)
    return(
        <>
            <nav className="page-section index-nav-wrapper"> 
                <div className="page-section__child index-nav">
                    <div>
                        <button className="index-sidenav-toggle" onClick={() => toggleMiniNav(miniNav.current)}>
                            <div>

                            </div>
                            <div>
                                
                            </div>
                        </button>
                        <img src="/favicon.svg" alt="alzher logo" />
                        <ul>
                            <li>
                                <Link to={""}>My Dashboard</Link>
                            </li>
                            <li>
                                <Link to={""}>Terms and Service</Link>
                            </li>
                            <li>
                                <Link to={""}>Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to={""}>About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Link to={""}> 
                            <CiUser />
                            <p>Sign In</p>
                        </Link>
                    </div>
                </div>
                <div ref={miniNav} className="page-section__child index-mini-nav">
                    <ul>
                        <li>
                            <Link to={""}>My Dashboard</Link>
                        </li>
                        <li>
                            <Link to={""}>Terms and Service</Link>
                        </li>
                        <li>
                            <Link to={""}>Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to={""}>About Us</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default IndexNav