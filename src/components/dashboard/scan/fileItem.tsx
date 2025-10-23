import React, { SetStateAction } from 'react'
import deleteFile from './helpers/deleteFile'
interface FileItemProps {
    fileSize: number,
    fileName: string,
    fileHash: string,
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>
}

const FileItem: React.FC<FileItemProps> = ({fileSize, fileName, fileHash, setFileList}) => {
    return(
        <>
            <div className='file-item'>
                <p>{fileName}</p>
                <div>
                    <p>{fileSize} KB</p>
                    <button onClick={() => deleteFile(fileHash, setFileList)}>
                        delete
                    </button>
                </div>
            </div>
        </>
    )
}

export default FileItem