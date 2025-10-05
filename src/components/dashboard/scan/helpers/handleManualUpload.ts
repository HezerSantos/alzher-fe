import React, { SetStateAction } from 'react'

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

export default handleManualUpload