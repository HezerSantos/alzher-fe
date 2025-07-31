import { Link } from "react-router-dom"
import { CiUser } from "react-icons/ci";
const IndexNav: React.FC = () => {
    return(
        <>
            <nav className="page-section"> 
                <div className="page-section__child index-nav">
                    <div>
                        <button className="index-sidenav-toggle">
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
            </nav>
        </>
    )
}

export default IndexNav