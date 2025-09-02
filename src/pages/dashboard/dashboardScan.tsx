import React, { SetStateAction, useContext, useEffect, useState } from 'react'
import '../../assets/styles/dashboard/dashboard.css'
import DashboardMiniNav from '../../components/universal/navbar/dashboardMiniNav'
import DashboardNav from '../../components/universal/navbar/dashboardNav'
import DashboardContext from '../../context/dashboard/dashboardContext'
import { IoIosArrowDown } from "react-icons/io";
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
        setFileList: React.Dispatch<SetStateAction<File[]>>
) => void

const handleDrop: HandleDropType = (e, setFileList) => {
    e.preventDefault()
    e.stopPropagation()
    const newFile = e.dataTransfer.files[0]

    setFileList(prevList => {
        const newList = [...prevList]
        newList.push(newFile)

        return newList
    })
}

interface ScanFormProps {
    setFileList: React.Dispatch<SetStateAction<File[]>>
}

type HandleManualUploadType = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFileList: React.Dispatch<SetStateAction<File[]>>
) => void
const handleManualUpload: HandleManualUploadType = (e, setFileList) => {
    const inputFileList = e.target.files

    if(inputFileList){
        const newFile = inputFileList[0]
        setFileList(prevList => {
            const newList = [...prevList]
            newList.push(newFile)

            return newList
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
    fileList: File[]
}

const FileContainer: React.FC<FileContainerProps> = ({fileList}) => {
    return(
        <div className='file-container'>
            {fileList.map((file, index) => {
                return(
                    <FileItem 
                        key={index}
                        fileName={file.name}
                        fileSize={file.size}
                    />
                )
            })}
        </div>
    )
}

interface FileItemProps {
    fileSize: number,
    fileName: string
}

const FileItem: React.FC<FileItemProps> = ({fileSize, fileName}) => {
    return(
        <>
            <div className='file-item'>
                <p>{fileSize}</p>
                <p>{fileName}</p>
            </div>
        </>
    )
}

const DashboardScan: React.FC = () => {
    const dashboardContext = useContext(DashboardContext)
    const [ fileList, setFileList ] = useState<File[]>([])

    useEffect(() => {
        console.log(fileList)
    }, [fileList])
    return(
        <>
            <div className="page-section">
                <div className={`page-section__child dashboard-parent ${dashboardContext?.isHidden? "d-nav__grid-reset" : ""}`}>
                    <DashboardNav />
                    <DashboardMiniNav />
                    <div className='scan-container'>
                        <ScanHeader />
                        <ScanForm setFileList={setFileList}/>
                    </div>
                    <FileContainer 
                        fileList={fileList}
                    />
                </div>
            </div>
        </>
    )
}

export default DashboardScan