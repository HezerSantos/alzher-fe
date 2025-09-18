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
    setIsError: React.Dispatch<SetStateAction<boolean>>
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
    setIsError: React.Dispatch<SetStateAction<boolean>>,
    newCsrf?: string
) => void

const submitFiles: SubmitFilesType = async(fileList, csrfContext, authContext, retry, setIsError, newCsrf) => {
    const formData = new FormData()


    const filesArray = [...fileList.values()];
    filesArray.forEach(file => {
        formData.append('files', file)
    });

    try {
        const res = await api.post("/api/dashboard/scan", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
            }
        })
        console.log("success")
    } catch(error) {
        const axiosError = error as AxiosError
        handleRequestError(axiosError, csrfContext, axiosError.status, retry, 
            [
                () => submitFiles(fileList, csrfContext, authContext, true, setIsError),
                (newCsrf: string) => submitFiles(fileList, csrfContext, authContext, false, setIsError, newCsrf),
                () => submitFiles(fileList, csrfContext, authContext, true, setIsError)
            ],
            [
                {
                    errorName: "invalidProcess",
                    setMsgError: setIsError
                }
            ],
            authContext
        )
    }
}


const FileContainer: React.FC<FileContainerProps> = ({fileList, setFileList, csrfContext, authContext, setIsError}) => {
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
                    <button className='file-submit' onClick={() => submitFiles(fileList, csrfContext, authContext, true, setIsError)}>
                        Scan Files
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
    const [ isError, setIsError ] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            await authContext?.refresh(true) 
        }

        fetchData()
    }, [])

    useEffect(() => {
        if(isError){
            const timeout = setTimeout(() => {
                setIsError(false)
            }, 5000)
        }
    }, [isError])


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
                            {isError && (
                                <AlzherMessage msg='Unable to process statement' error={true}/>
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
                                    setIsError={setIsError}
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