import React, { SetStateAction, useContext, useEffect, useState } from "react"
import DashboardContext from "../../context/dashboard/dashboardContext"
import DashboardNav from "../../components/universal/navbar/dashboardNav"
import DashboardMiniNav from "../../components/universal/navbar/dashboardMiniNav"
import SettingsNav from "../../components/settings/settingsNav"
import SettingsContent from "../../components/settings/settingsContent"
import fetchDashboardData from "../../functionHelpers/fetchDashboardData"
import CsrfContext from "../../context/csrf/csrfContext"
import AuthContext from "../../context/auth/authContext"
import ErrorContext from "../../context/error/errorContext"
import { IoMdClose } from "react-icons/io";
import { AxiosError } from "axios"
import handleApiError from "../../app.config.error"
import api from "../../app.config"
interface InputElementProps {
    type: string,
    inputName: string,
    labelName: string,
    className: string
}

const InputElement: React.FC<InputElementProps> = ({type, inputName, labelName, className}) => {
    return(
        <>
            <div className="edit-input-item">
                <label htmlFor={inputName}>{labelName}</label>
                <input type={type} id={inputName} name={inputName} className={className}/>
            </div>
        </>
    )
}

type HandleSubmitType = (
    e: React.FormEvent<HTMLFormElement>,
    setIsError: React.Dispatch<SetStateAction<ErrorType | null>>,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>,
    csrfContext: CsrfContextType | null,
    authContext: AuthContextType | null,
    errorContext: ErrorContextType | null,
    path: string,
    newCsrf?: string,
    newBody?: Record<string, any>
) => void

const handleSubmit: HandleSubmitType = async(e, setIsError, setIsOpen, csrfContext, authContext, errorContext, path, newCsrf, newBody) => {
    e.preventDefault()
    let body
    const form = e.currentTarget
    if(!newBody){
        const objectBody = [...form.elements].map((element) => {
            const el = element as HTMLInputElement

            return [el.name, el.value]
        }).filter((element) => element[1])
        body = Object.fromEntries(objectBody)
        newBody = body
    }
    try{
        await api.patch(`/api/dashboard/settings/${path}`, 
            newBody? newBody : body, 
            {
                headers: {
                    csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
                }
            }
        )
        setIsError({msg: "", isError: false})
        setIsOpen(false)
    } catch (error) {
        const axiosError = error as AxiosError
        handleApiError(
            {
                axiosError: axiosError,
                status: axiosError.status,
                csrfContext: csrfContext,
                authContext: authContext,
                errorContext: errorContext,
                callbacks: {
                    handlePublicAuthRetry: () => handleSubmit(e, setIsError, setIsOpen, csrfContext, authContext, errorContext, path, undefined, newBody),
                    handleCsrfRetry: (newCsrf) => handleSubmit(e, setIsError, setIsOpen, csrfContext, authContext, errorContext, path, newCsrf, newBody),
                    handleSecureAuthRetry: () => handleSubmit(e, setIsError, setIsOpen, csrfContext, authContext, errorContext, path, undefined, newBody)
                },
                setStateErrors: [
                    {
                        errorName: "updatePassword",
                        setState: setIsError
                    }
                ]
            }
        )
    }
}

interface ErrorType {
    msg: string,
    isError: boolean
}

interface DialogProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const Dialog: React.FC<DialogProps> = ({isOpen, setIsOpen}) => {
    const csrfContext = useContext(CsrfContext)
    const authContext = useContext(AuthContext)
    const errorContext = useContext(ErrorContext)
    const [ isError, setIsError ] = useState<ErrorType | null>(null)
    return(
        <>
            <div className={`edit-modal-container ${isOpen? "modal-open" : "modal-closed"} `}>
                <dialog className="edit-modal" open={isOpen}>
                    <button onClick={() => setIsOpen(false)}>
                        <IoMdClose />
                    </button>
                    <form onSubmit={(e) => handleSubmit(e, setIsError, setIsOpen, csrfContext, authContext, errorContext, 'password')}>
                        {isError?.isError && (
                            <p className="validation-error">{isError.msg}</p>
                        )}
                        <InputElement type="password" inputName="currentPassword" labelName="Current Password" className={`${isError?.isError? 'input-error' : ""}`} />
                        <InputElement type="password" inputName="password" labelName="New Password" className={`${isError?.isError? 'input-error' : ""}`}/>
                        <InputElement type="password" inputName="confirmPassword" labelName="Confirm Password" className={`${isError?.isError? 'input-error' : ""}`}/>
                        <button>
                            Change Password
                        </button>
                    </form>
                </dialog>
            </div>
        </>
    )
}

interface DashboardDataType {
    email: string
}

const Settings: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    const csrfContext = useContext(CsrfContext)
    const authContext = useContext(AuthContext)
    const errorContext = useContext(ErrorContext)
    const [ selectedSetting, setSelectedSetting ] = useState("security")
    const [ dashboardData, setDashboardData ] = useState<DashboardDataType | null>(null)
    const [ isOpen, setIsOpen ] = useState(false)
    useEffect(() => {
        fetchDashboardData(csrfContext, authContext, errorContext, setDashboardData, '/settings')
    }, [])
    return(
        <>  
            <Dialog isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className="page-section">
                <div className={`page-section__child dashboard-parent ${dashboardContext?.isHidden? "d-nav__grid-reset" : ""}`}>
                    <DashboardNav />
                    <DashboardMiniNav />
                    <div className="dashboard-settings">
                        <div className="settings-header">
                            <h1>Settings</h1>
                        </div>
                        <SettingsNav selectedSetting={selectedSetting} setSelectedSetting={setSelectedSetting} />
                        <SettingsContent selectedSetting={selectedSetting} email={dashboardData?.email} setIsOpen={setIsOpen}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings