import SettingsInputElement from "../../components/settings/settingsInputElement"

interface ErrorType {
    msg: string,
    isError: boolean
}


interface UpdateEmailSettingProps {
    isError: ErrorType | null
}

const UpdateEmailSetting: React.FC<UpdateEmailSettingProps> = ({isError}) => {
    return(
        <>
            <SettingsInputElement type="text" inputName="newEmail" labelName="New Email" className={`${isError?.isError? 'input-error' : ""}`}/>
            <SettingsInputElement type="password" inputName="password" labelName="Password" className={`${isError?.isError? 'input-error' : ""}`} />
        </>
    )
}

export default UpdateEmailSetting