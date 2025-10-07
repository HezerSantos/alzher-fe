import { Link } from "react-router-dom"
import { FaRegFaceSadTear } from "react-icons/fa6";
import IndexNav from "../../components/universal/navbar/indexNav"

const Error404: React.FC = () => {
    return(
        <>
            <div className="page-section">
                <div className="page-section__child">
                    <IndexNav />
                    <div className="error-page">
                        <FaRegFaceSadTear />
                        <h1>
                        404 Not Found
                        </h1>
                        <p>Opps! Looks like this page doesnt exist</p>
                        <Link to={"/"}>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error404