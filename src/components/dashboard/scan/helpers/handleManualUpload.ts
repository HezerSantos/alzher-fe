import React, { SetStateAction } from 'react'
async function getFileHash(file: File) {
  const buffer = await file.arrayBuffer();       // read full file
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer); // hash
  const hashArray = Array.from(new Uint8Array(hashBuffer));          // convert to bytes
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // hex string
}

type HandleManualUploadType = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>,
    globalContext: GlobalContextType
) => void
const handleManualUpload: HandleManualUploadType = async(e, setFileList, globalContext) => {
    const inputFileList = e.target.files

    if(inputFileList){
        const newFile = inputFileList[0]
        if(newFile.type !== "application/pdf"){
            return
        }
        const hash = await getFileHash(newFile)

        let shouldSetError: {isError: boolean, status: number | null} | null = null

        setFileList(prevMap => {
            const newMap = new Map(prevMap)
            newMap.set(hash, newFile)
            const totalSize = [...newMap].reduce((acc, file) => {
                return acc += (file[1].size / (1024 * 1024))
            }, 0)
            if(totalSize > 10 || newMap.size > 10){
                shouldSetError = {isError: true, status: 413}
                return prevMap
            } else {
                return newMap
            }
        })

        if(shouldSetError){
            globalContext.error?.setError({isError: true, status: 413})
        }
    }
}

export default handleManualUpload