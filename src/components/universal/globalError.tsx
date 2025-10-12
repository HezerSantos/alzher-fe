import { useContext } from "react";
import { IoMdSpeedometer } from "react-icons/io";
import ErrorContext from "../../context/error/errorContext";


const errorMap = new Map(
    [
        [429, {msg: "Oops! Too many requests. Give it a moment and refresh the page.", icon: <IoMdSpeedometer />}]
    ]
)
const GlobalError: React.FC = () => {
    const errorContext = useContext(ErrorContext)
    return(
        <>
            <div className="global-error-container">
                <div className="global-error">
                    {errorMap.get(Number(errorContext?.error.status))?.icon}
                    <p>
                        {errorMap.get(Number(errorContext?.error.status))?.msg}
                    </p>
                    <button>
                        Close
                    </button>
                </div>
            </div>
        </>
    )
}

export default GlobalError