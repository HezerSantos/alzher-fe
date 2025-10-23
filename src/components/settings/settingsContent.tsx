import React, { SetStateAction, useMemo } from "react"
import SettingsSecurity from "./settingsSecurity"

interface IsOpenType {
    state: boolean,
    type: "email" | "password" | ""
}


interface SettingsContentProps {
    selectedSetting: string,
    email: string | undefined,
    setIsOpen: React.Dispatch<SetStateAction<IsOpenType>>
}



const SettingsContent: React.FC<SettingsContentProps> = ({selectedSetting, email, setIsOpen}) => {

    const settingsMap = useMemo( () => {
        const map = new Map([
        ['security', <SettingsSecurity email={email} setIsOpen={setIsOpen}/>]
        ])

        return map
    }, [email])
    return(
        <>
            {settingsMap.get(selectedSetting)}
        </>
    )
}

export default SettingsContent