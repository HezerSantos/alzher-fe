import { useContext } from "react";
import { IoMdSpeedometer } from "react-icons/io";
import { MdFileUploadOff } from "react-icons/md";
import ErrorContext from "../../context/error/errorContext";


const errorMap = new Map(
    [
        [429, {msg: "Oops! Too many requests. Give it a moment and refresh the page.", icon: <IoMdSpeedometer />}],
        [413, {msg: "Oops! Too many files. Maximum count is 10 at 5MB total.", icon: <MdFileUploadOff />}]
    ]
)

type CloseGlobalErrorType = (
    errorContext: ErrorContextType | null
) => void

const closeGlobalError: CloseGlobalErrorType = (errorContext) => {
    errorContext?.setError({isError: false, status: null})
}
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
                    <button onClick={() => closeGlobalError(errorContext)}>
                        Close
                    </button>
                </div>
            </div>
        </>
    )
}

export default GlobalError