type HandleDragEventType = (
    e: React.DragEvent<HTMLLabelElement>
) => void
const handleDragOver:HandleDragEventType  = (e) => {
    e.preventDefault()
}

export default handleDragOver