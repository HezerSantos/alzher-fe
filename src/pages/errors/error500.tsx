import { useNavigate } from "react-router-dom"
import { FaRegFaceSadTear } from "react-icons/fa6";
import { useContext } from "react";
import ErrorContext from "../../context/error/errorContext";

const Error500: React.FC = () => {
    const errorContext = useContext(ErrorContext)
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate("/")
        setTimeout(() => {
            errorContext?.setIsError(false);
        }, 0); 
    }
    return(
        <>
            <div className="page-section">
                <div className="page-section__child">
                    <div className="error-page error-500">
                        <FaRegFaceSadTear />
                        <h1>
                        500 Internal Server Error
                        </h1>
                        <p>Opps! Something went wrong</p>
                        <button onClick={() => handleNavigate()}>
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error500