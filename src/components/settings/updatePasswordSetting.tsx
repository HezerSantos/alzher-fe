import SettingsInputElement from "../../components/settings/settingsInputElement"

interface ErrorType {
    msg: string,
    isError: boolean
}


interface UpdatePasswordSettingProps {
    isError: ErrorType | null
}

const UpdatePasswordSetting: React.FC<UpdatePasswordSettingProps> = ({isError}) => {
    return(
        <>
            <SettingsInputElement type="password" inputName="currentPassword" labelName="Current Password" className={`${isError?.isError? 'input-error' : ""}`} />
            <SettingsInputElement type="password" inputName="password" labelName="New Password" className={`${isError?.isError? 'input-error' : ""}`}/>
            <SettingsInputElement type="password" inputName="confirmPassword" labelName="Confirm Password" className={`${isError?.isError? 'input-error' : ""}`}/>
        </>
    )
}

export default UpdatePasswordSetting