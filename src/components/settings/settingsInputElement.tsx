interface SettingsInputElementProps {
    type: string,
    inputName: string,
    labelName: string,
    className: string
}

const SettingsInputElement: React.FC<SettingsInputElementProps> = ({type, inputName, labelName, className}) => {
    return(
        <>
            <div className="edit-input-item">
                <label htmlFor={inputName}>{labelName}</label>
                <input type={type} id={inputName} name={inputName} className={className}/>
            </div>
        </>
    )
}

export default SettingsInputElement