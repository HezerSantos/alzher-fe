import React, { SetStateAction, useContext, useEffect, useRef, useState } from "react"
import handleSettingsSubmit from "./helpers/handleSubmit"
import CsrfContext from "../../context/csrf/csrfContext"
import AuthContext from "../../context/auth/authContext"
import ErrorContext from "../../context/error/errorContext"
import { IoMdClose } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import SettingsInputElement from "../../components/settings/settingsInputElement"
interface ErrorType {
    msg: string,
    isError: boolean
}

interface DialogProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const SettingsDialog: React.FC<DialogProps> = ({isOpen, setIsOpen}) => {
    const csrfContext = useContext(CsrfContext)
    const authContext = useContext(AuthContext)
    const errorContext = useContext(ErrorContext)
    const [ isError, setIsError ] = useState<ErrorType | null>(null)
    const [ isLoading, setIsLoading ] = useState(false)

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    useEffect(() => {
        if(isOpen){
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [isOpen])
    return(
        <>
            <dialog className="edit-modal" ref={dialogRef}>
                <button onClick={() => setIsOpen(false)}>
                    <IoMdClose />
                </button>
                <form onSubmit={(e) => handleSettingsSubmit(e, setIsError, setIsOpen, setIsLoading, csrfContext, authContext, errorContext, 'password', 'patch')}>
                    {isError?.isError && (
                        <p className="validation-error">{isError.msg}</p>
                    )}
                    <SettingsInputElement type="password" inputName="currentPassword" labelName="Current Password" className={`${isError?.isError? 'input-error' : ""}`} />
                    <SettingsInputElement type="password" inputName="password" labelName="New Password" className={`${isError?.isError? 'input-error' : ""}`}/>
                    <SettingsInputElement type="password" inputName="confirmPassword" labelName="Confirm Password" className={`${isError?.isError? 'input-error' : ""}`}/>
                    <button disabled={isLoading}>
                        {!isLoading? "Change Password" : <AiOutlineLoading  className="button-loading"/>}
                    </button>
                </form>
            </dialog>
        </>
    )
}

export default SettingsDialog