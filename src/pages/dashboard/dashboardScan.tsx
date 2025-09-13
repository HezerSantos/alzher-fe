import React, { SetStateAction, useContext, useEffect, useState } from 'react'
import '../../assets/styles/dashboard/dashboard.css'
import DashboardMiniNav from '../../components/universal/navbar/dashboardMiniNav'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
import DashboardContext from '../../context/dashboard/dashboardContext'
import { IoIosArrowDown } from "react-icons/io";
import api from '../../app.config'
import CsrfContext from '../../context/csrf/csrfContext'
import AuthContext from '../../context/auth/authContext'
import LoadingScreen from '../helpers/loadingScreen'
import NotLoggedIn from '../helpers/notLoggedIn'
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
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>
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
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>
}

type SubmitFilesType = (fileList: Map<string, File>) => void

const submitFiles: SubmitFilesType = (fileList) => {
    console.log(fileList)
}
const FileContainer: React.FC<FileContainerProps> = ({fileList, setFileList}) => {
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
                    <button className='file-submit' onClick={() => submitFiles(fileList)}>
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
    const csrfContext = useContext(CsrfContext)
    const authContext = useContext(AuthContext)
    const [ fileList, setFileList ] = useState<Map<string, File>>(new Map())


    useEffect(() => {
        const fetchData = async() => {
            await authContext?.refresh(true)


            
        }

        fetchData()
    }, [])



    return(
        <>
            {authContext?.isAuthLoading? (
                <>
                    <LoadingScreen />
                </>
            ) : (
                authContext?.isAuth? (
                    <div className="page-section">
                        <div className={`page-section__child dashboard-parent ${dashboardContext?.isHidden? "d-nav__grid-reset" : ""}`}>
                            <DashboardNav />
                            <DashboardMiniNav />
                            <div className='scan-container'>
                                <ScanHeader />
                                <ScanForm setFileList={setFileList}/>
                                <FileContainer 
                                    fileList={fileList}
                                    setFileList={setFileList}
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