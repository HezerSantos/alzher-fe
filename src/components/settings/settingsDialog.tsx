import React, { SetStateAction, useEffect, useRef, useState } from "react"
import handleSettingsSubmit from "./helpers/handleSubmit"
import { IoMdClose } from "react-icons/io";
import { AiOutlineLoading } from "react-icons/ai";
import UpdatePasswordSetting from "./updatePasswordSetting"
import UpdateEmailSetting from "./updateEmailSetting"
import useGlobalContext from "../../customHooks/useContexts"
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
   const globalContext = useGlobalContext()
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
                <form onSubmit={(e) => handleSettingsSubmit(e, setIsError, setIsOpen, setIsLoading, globalContext, isOpen.type, 'patch')}>
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