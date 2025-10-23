import { IoIosLock } from "react-icons/io";
import IndexNav from "../../components/universal/navbar/indexNav";
import { Link } from "react-router-dom";

const NotLoggedIn: React.FC = () => {
    return(
        <>
            <IndexNav />
            <div className="page-section">
                <div className="page-section__child not-logged-in">
                    <IoIosLock />
                    <h1>No Access</h1>
                    <p>Please <Link to={"/login"}>login</Link> to view this page</p>
                </div>
            </div>
        </>
    )
}

export default NotLoggedIn