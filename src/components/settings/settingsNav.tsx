import React, { SetStateAction } from "react"

interface SettingsNavProps {
    selectedSetting: string,
    setSelectedSetting: React.Dispatch<SetStateAction<string>>
}

const SettingsNav: React.FC<SettingsNavProps> = ({selectedSetting}) => {
    return(
        <>
            <nav className="settings-nav">
                <ul>
                    <li>
                        <button className={`${selectedSetting === 'security'? 'selected-setting' : ""}`}>
                            Security
                        </button>
                    </li>
                    {/* <li>
                        <button>
                            My Data
                        </button>
                    </li> */}
                </ul>
            </nav>
        </>
    )
}

export default SettingsNav