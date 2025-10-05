import React, { SetStateAction } from 'react'

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

export default deleteFile