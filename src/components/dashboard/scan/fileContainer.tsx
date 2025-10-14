import React, { SetStateAction } from 'react'
import { AiOutlineLoading } from "react-icons/ai";
import submitFiles from './helpers/submitFiles';
import FileItem from './fileItem';
import useGlobalContext from '../../../customHooks/useContexts';
interface FileContainerProps {
    fileList: Map<string, File>,
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>,
    setIsMessage: React.Dispatch<SetStateAction<{error: boolean, ok: boolean}>>
    setIsLoading: React.Dispatch<SetStateAction<boolean>>,
    isLoading: boolean
}

const FileContainer: React.FC<FileContainerProps> = ({fileList, setFileList, setIsMessage, setIsLoading, isLoading}) => {
    const globalContext = useGlobalContext()
    return(
        <div className='file-container'>
            {[...fileList.entries()].map(([hash, file]) => {
                return(
                    <FileItem 
                        key={hash}
                        fileName={file.name}
                        fileHash={hash}
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
                        onClick={() => submitFiles(fileList, globalContext, setIsMessage, setIsLoading)}>
                        {isLoading? <AiOutlineLoading className="button-loading"/> : "Scan Files"}
                    </button>
                </>
            )}
        </div>
    )
}

export default FileContainer