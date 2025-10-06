import { Link } from "react-router-dom"
import { CiUser } from "react-icons/ci";
import { useContext, useRef } from "react";
import AuthContext from "../../../context/auth/authContext";

type ToggleMiniNavType = (miniNav: HTMLDivElement | null) => void
const toggleMiniNav: ToggleMiniNavType = (miniNav) => {
    if(miniNav){
        miniNav.classList.toggle("toggle-nav-animation")
    }
}
const IndexNav: React.FC = () => {
    const miniNav = useRef<HTMLDivElement | null>(null)
    const authContext = useContext(AuthContext)
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
                                <Link to={"/"}>Home</Link>
                            </li>
                            <li>
                                {authContext?.isAuthState.isAuth && (
                                    <Link to={"/dashboard"}>My Dashboard</Link>
                                )}
                            </li>
                            <li>
                                <Link to={"/terms-and-privacy"}>Terms and Privacy</Link>
                            </li>
                            <li>
                                <Link to={""}>About Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Link to={"/login"}> 
                            <CiUser />
                            <p>Log In</p>
                        </Link>
                    </div>
                </div>
                <div ref={miniNav} className="page-section__child index-mini-nav">
                    <ul>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li>
                                {authContext?.isAuthState.isAuth && (
                                    <Link to={"/dashboard"}>My Dashboard</Link>
                                )}
                        </li>
                        <li>
                            <Link to={""}>Terms and Privacy</Link>
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