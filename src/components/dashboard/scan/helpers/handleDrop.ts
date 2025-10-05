import React, { SetStateAction } from 'react'
type HandleDropType = (
    e: React.DragEvent<HTMLLabelElement>,
        setFileList: React.Dispatch<SetStateAction<Map<string, File>>>
) => void

const handleDrop: HandleDropType = (e, setFileList) => {
    e.preventDefault()
    e.stopPropagation()
    const fileList = e.dataTransfer.files

    const filteredFileList = Array.from(fileList).filter(file => file.type === "application/pdf")
    setFileList(prevMap => {
        const newMap = new Map(prevMap)
        for (const file of filteredFileList){
            newMap.set(file.name, file)
        }

        return newMap
    })
}

export default handleDrop