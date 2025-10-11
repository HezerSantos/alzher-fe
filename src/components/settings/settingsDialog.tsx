import React, { SetStateAction, useContext, useEffect, useRef, useState } from "react"
import handleSettingsSubmit from "./helpers/handleSubmit"
import CsrfContext from "../../context/csrf/csrfContext"
import AuthContext from "../../context/auth/authContext"
import ErrorContext from "../../context/error/errorContext"
import { IoMdClose } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import UpdatePasswordSetting from "./updatePasswordSetting"
import UpdateEmailSetting from "./updateEmailSetting"
interface ErrorType {
    msg: string,
    isError: boolean
}

interface DialogProps {
    isOpen: IsOpenType,
    setIsOpen: React.Dispatch<SetStateAction<IsOpenType>>
}

interface IsOpenType {
    state: boolean,
    type: "email" | "password" | ""
}


const SettingsDialog: React.FC<DialogProps> = ({isOpen, setIsOpen}) => {
    const csrfContext = useContext(CsrfContext)
    const authContext = useContext(AuthContext)
    const errorContext = useContext(ErrorContext)
    const [ isError, setIsError ] = useState<ErrorType | null>(null)
    const [ isLoading, setIsLoading ] = useState(false)

    const dialogRef = useRef<HTMLDialogElement | null>(null)

    useEffect(() => {
        if(isOpen.state){
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [isOpen])

    return(
        <>
            <dialog className="edit-modal" ref={dialogRef}>
                <button onClick={() => {setIsOpen({state: false, type: ""}); setIsError(null)}}>
                    <IoMdClose />
                </button>
                <form onSubmit={(e) => handleSettingsSubmit(e, setIsError, setIsOpen, setIsLoading, csrfContext, authContext, errorContext, isOpen.type, 'patch')}>
                    {isError?.isError && (
                        <p className="validation-error">{isError.msg}</p>
                    )}
                    {(isOpen.state && (isOpen.type === "password")) && (
                        <UpdatePasswordSetting isError={isError}/>
                    )}
                    {(isOpen.state && (isOpen.type === "email")) && (
                        <UpdateEmailSetting isError={isError}/>
                    )}
                    <button disabled={isLoading}>
                        {!isLoading? "Change Password" : <AiOutlineLoading  className="button-loading"/>}
                    </button>
                </form>
            </dialog>
        </>
    )
}

export default SettingsDialog