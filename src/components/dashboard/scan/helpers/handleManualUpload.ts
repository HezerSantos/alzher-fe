import React, { SetStateAction } from 'react'
async function getFileHash(file: File) {
  const buffer = await file.arrayBuffer();       // read full file
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer); // hash
  const hashArray = Array.from(new Uint8Array(hashBuffer));          // convert to bytes
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // hex string
}

type HandleManualUploadType = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>
) => void
const handleManualUpload: HandleManualUploadType = async(e, setFileList) => {
    const inputFileList = e.target.files

    if(inputFileList){
        const newFile = inputFileList[0]
        if(newFile.type !== "application/pdf"){
            return
        }
        const hash = await getFileHash(newFile)

        setFileList(prevMap => {
            const newMap = new Map(prevMap)
            newMap.set(hash, newFile)

            return newMap
        })
    }
}

export default handleManualUpload