import React, { SetStateAction } from 'react'

async function getFileHash(file: File) {
  const buffer = await file.arrayBuffer();       // read full file
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer); // hash
  const hashArray = Array.from(new Uint8Array(hashBuffer));          // convert to bytes
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // hex string
}


type HandleDropType = (
    e: React.DragEvent<HTMLLabelElement>,
        setFileList: React.Dispatch<SetStateAction<Map<string, File>>>
) => void

const handleDrop: HandleDropType = async(e, setFileList) => {
    e.preventDefault()
    e.stopPropagation()
    const fileList = e.dataTransfer.files

    const filteredFileList = Array.from(fileList).filter(file => file.type === "application/pdf")


    const filePromises = filteredFileList.map(async(file) => [ await getFileHash(file), file ])

    const resolvedFiles = await Promise.all(filePromises) as [string, File][]
    
    setFileList(prevMap => {
        return new Map([...prevMap, ...resolvedFiles])
    })
}

export default handleDrop