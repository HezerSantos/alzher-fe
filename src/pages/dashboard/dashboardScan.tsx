import React, { SetStateAction, useContext, useEffect, useState } from 'react'
import '../../assets/styles/dashboard/dashboard.css'
import DashboardMiniNav from '../../components/universal/navbar/dashboardMiniNav'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
import DashboardContext from '../../context/dashboard/dashboardContext'
import { IoIosArrowDown } from "react-icons/io";
import AuthContext from '../../context/auth/authContext'
import LoadingScreen from '../helpers/loadingScreen'
import NotLoggedIn from '../helpers/notLoggedIn'
import api from '../../app.config'
import { AxiosError } from 'axios'
import handleRequestError from '../../app.config.error'
import CsrfContext from '../../context/csrf/csrfContext'
import AlzherMessage from '../../components/universal/alzherMessage'
import { AiOutlineLoading } from "react-icons/ai";
const ScanHeader: React.FC = () => {
    return(
        <div className='scan-header'>
            <h1>
                Scan
            </h1>
        </div>
    )
}

//Handle Drag Over Type

type HandleDragEventType = (
    e: React.DragEvent<HTMLLabelElement>
) => void
const handleDragOver:HandleDragEventType  = (e) => {
    e.preventDefault()
}

type HandleDropType = (
    e: React.DragEvent<HTMLLabelElement>,
        setFileList: React.Dispatch<SetStateAction<Map<string, File>>>
) => void

const handleDrop: HandleDropType = (e, setFileList) => {
    e.preventDefault()
    e.stopPropagation()
    const newFile = e.dataTransfer.files[0]
    if(newFile.type !== "application/pdf"){
        return
    }
    setFileList(prevMap => {
        const newMap = new Map(prevMap)
        newMap.set(newFile.name, newFile)

        return newMap
    })
}

interface ScanFormProps {
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>,
}

type HandleManualUploadType = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>
) => void
const handleManualUpload: HandleManualUploadType = (e, setFileList) => {
    const inputFileList = e.target.files

    if(inputFileList){
        const newFile = inputFileList[0]
        if(newFile.type !== "application/pdf"){
            return
        }

        setFileList(prevMap => {
            const newMap = new Map(prevMap)
            newMap.set(newFile.name, newFile)

            return newMap
        })
    }
}

const ScanForm: React.FC<ScanFormProps> = ({setFileList}) => {
    return(
        <form action="" className='scan-form'>
            <label htmlFor="file-input"
                onDrop={(e) => handleDrop(e, setFileList)}
                onDragOver={(e) => handleDragOver(e)}
                className='file-input-label'
            >   <h1>Upload Statement</h1>
                <div>
                    <p>Choose Files</p>
                    <div>
                        <IoIosArrowDown />
                    </div>
                </div>
                <p>By proceeding, you agree to our Terms of Service</p>
            </label>
            <input type="file" id='file-input' name='transactionDocuments' onChange={(e) => handleManualUpload(e, setFileList)}/>
        </form>
    )
}

interface FileContainerProps {
    fileList: Map<string, File>,
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>,
    csrfContext: CsrfContextType | null,
    authContext: AuthContextType,
    setIsMessage: React.Dispatch<SetStateAction<{error: boolean, ok: boolean}>>
    setIsLoading: React.Dispatch<SetStateAction<boolean>>,
    isLoading: boolean
}

interface CsrfContextType {
    csrfToken: string | null
    decodeCookie: (cookie: string) => void
    getCsrf: () => Promise<string | undefined>
}

interface AuthContextType {
    refresh: (retry: boolean, newCsrf?: string | null) => void,
    isAuthState: {isAuth: boolean, isAuthLoading: boolean},
    setIsAuthState: React.Dispatch<SetStateAction<{isAuth: boolean, isAuthLoading: boolean}>>
}



type SubmitFilesType = (
    fileList: Map<string, File>, 
    csrfContext: CsrfContextType | null, 
    authContext: AuthContextType, 
    retry: boolean, 
    setIsMessage: React.Dispatch<SetStateAction<{error: boolean, ok: boolean}>>,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>,
    newCsrf?: string
) => void

const submitFiles: SubmitFilesType = async(fileList, csrfContext, authContext, retry, setIsMessage, setIsLoading, newCsrf) => {
    const formData = new FormData()


    const filesArray = [...fileList.values()];
    filesArray.forEach(file => {
        formData.append('files', file)
    });
    setIsLoading(true)
    try {
        const res = await api.post("/api/dashboard/scan", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
            }
        })
        console.log("success")
        setIsMessage({error: false, ok: true})
    } catch(error) {
        const axiosError = error as AxiosError
        handleRequestError(axiosError, csrfContext, axiosError.status, retry, 
            [
                () => submitFiles(fileList, csrfContext, authContext, true, setIsMessage, setIsLoading),
                (newCsrf: string) => submitFiles(fileList, csrfContext, authContext, false, setIsMessage, setIsLoading, newCsrf),
                () => submitFiles(fileList, csrfContext, authContext, true, setIsMessage, setIsLoading)
            ],
            [
                {
                    errorName: "invalidProcess",
                    setMsgError: setIsMessage
                }
            ],
            authContext
        )
    } finally {
        setIsLoading(false)
    }
}


const FileContainer: React.FC<FileContainerProps> = ({fileList, setFileList, csrfContext, authContext, setIsMessage, setIsLoading, isLoading}) => {
    return(
        <div className='file-container'>
            {[...fileList.values()].map((file, index) => {
                return(
                    <FileItem 
                        key={index}
                        fileName={file.name}
                        fileSize={Math.floor(file.size / 1024)}
                        setFileList={setFileList}
                    />
                )
            })}
            {fileList.size !== 0 && (
                <>
                    <button 
                        disabled={isLoading}
                        className='file-submit' 
                        onClick={() => submitFiles(fileList, csrfContext, authContext, true, setIsMessage, setIsLoading)}>
                        {isLoading? <AiOutlineLoading className="button-loading"/> : "Scan Files"}
                    </button>
                </>
            )}
        </div>
    )
}

interface FileItemProps {
    fileSize: number,
    fileName: string,
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>
}

type DeleteFileType = (
    fileName: string,
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>
) => void


const deleteFile: DeleteFileType = (fileName, setFileList) => {
    setFileList(prevMap => {
        const newMap = new Map(prevMap)

        newMap.delete(fileName)

        return newMap
    })
}
const FileItem: React.FC<FileItemProps> = ({fileSize, fileName, setFileList}) => {
    return(
        <>
            <div className='file-item'>
                <p>{fileName}</p>
                <div>
                    <p>{fileSize} KB</p>
                    <button onClick={() => deleteFile(fileName, setFileList)}>
                        delete
                    </button>
                </div>
            </div>
        </>
    )
}

const DashboardScan: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    const authContext = useContext(AuthContext)
    const csrfContext = useContext(CsrfContext)
    const [ fileList, setFileList ] = useState<Map<string, File>>(new Map())
    const [ isMessage, setIsMessage ] = useState({error: false, ok: false})
    const [ isLoading, setIsLoading ] = useState(false)
    useEffect(() => {
        const fetchData = async() => {
            await authContext?.refresh(true) 
        }

        fetchData()
    }, [])

    useEffect(() => {
        if(isMessage.error || isMessage.ok){
            const timeout = setTimeout(() => {
                setIsMessage({error: false, ok: false})
            }, 5000)
        }
        if(isMessage.ok){
            setFileList(new Map())
        }
    }, [isMessage])


    return(
        <>
            {authContext?.isAuthState.isAuthLoading? (
                <>
                    <LoadingScreen />
                </>
            ) : (
                authContext?.isAuthState.isAuth? (
                    <div className="page-section">
                        <div className={`page-section__child dashboard-parent ${dashboardContext?.isHidden? "d-nav__grid-reset" : ""}`}>
                            {isMessage.error && (
                                <AlzherMessage msg='Unable to process statement' error={true}/>
                            )}
                            {isMessage.ok && (
                                <AlzherMessage msg='Successfully processed statement' error={false}/>
                            )}
                            <DashboardNav />
                            <DashboardMiniNav />
                            <div className='scan-container'>
                                <ScanHeader />
                                <ScanForm setFileList={setFileList}/>
                                <FileContainer 
                                    fileList={fileList}
                                    setFileList={setFileList}
                                    csrfContext={csrfContext}
                                    authContext={authContext}
                                    setIsMessage={setIsMessage}
                                    setIsLoading={setIsLoading}
                                    isLoading={isLoading}
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <NotLoggedIn />
                    </>
                )
            )}
        </>
    )
}

export default DashboardScan