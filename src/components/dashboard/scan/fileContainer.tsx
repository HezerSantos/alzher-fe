import React, { SetStateAction } from 'react'
import { AiOutlineLoading } from "react-icons/ai";
import submitFiles from './helpers/submitFiles';
import FileItem from './fileItem';
interface FileContainerProps {
    fileList: Map<string, File>,
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>,
    csrfContext: CsrfContextType | null,
    authContext: AuthContextType,
    setIsMessage: React.Dispatch<SetStateAction<{error: boolean, ok: boolean}>>
    setIsLoading: React.Dispatch<SetStateAction<boolean>>,
    isLoading: boolean
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
                        onClick={() => submitFiles(fileList, csrfContext, authContext, setIsMessage, setIsLoading)}>
                        {isLoading? <AiOutlineLoading className="button-loading"/> : "Scan Files"}
                    </button>
                </>
            )}
        </div>
    )
}

export default FileContainer