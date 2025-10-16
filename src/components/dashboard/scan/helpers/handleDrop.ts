import React, { SetStateAction } from 'react'

async function getFileHash(file: File) {
  const buffer = await file.arrayBuffer();       // read full file
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer); // hash
  const hashArray = Array.from(new Uint8Array(hashBuffer));          // convert to bytes
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // hex string
}


type HandleDropType = (
    e: React.DragEvent<HTMLLabelElement>,
    setFileList: React.Dispatch<SetStateAction<Map<string, File>>>,
    globalContext: GlobalContextType
) => void

const handleDrop: HandleDropType = async(e, setFileList, globalContext) => {
    e.preventDefault()
    e.stopPropagation()
    const fileList = e.dataTransfer.files

    const filteredFileList = Array.from(fileList).filter(file => file.type === "application/pdf")


    const filePromises = filteredFileList.map(async(file) => [ await getFileHash(file), file ])

    const resolvedFiles = await Promise.all(filePromises) as [string, File][]
    
    let shouldSetError: {isError: boolean, status: number | null} | null = null

    setFileList(prevMap => {
        const newMap = new Map([...prevMap, ...resolvedFiles])
        const totalSize = [...newMap].reduce((acc, file) => {
            return acc += (file[1].size / (1024 * 1024))
        }, 0)
        if(totalSize > 10 || newMap.size > 10){
            shouldSetError = {isError: true, status: 413}
            return prevMap
        } else {
            return new Map([...prevMap, ...resolvedFiles])
        }
    })

    if(shouldSetError){
        globalContext.error?.setError({isError: true, status: 413})
    }
}

export default handleDrop