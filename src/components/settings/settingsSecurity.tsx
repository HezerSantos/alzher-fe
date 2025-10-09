import React, { SetStateAction } from "react"
import { MdOutlineEdit } from "react-icons/md";


interface SettingsSecurityProps {
    email: string | undefined,
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}
const SettingsSecurity: React.FC<SettingsSecurityProps> = ({email, setIsOpen}) => {
    return(
        <>
            <div className="settings-item">
                <div className="settings-security-item">
                    <div>
                        <p>Email Address</p>
                        <p>The email address associated with your account.</p>
                    </div>
                    <div>
                        <p>{email}</p>
                        <button onClick={() => setIsOpen(true)}>
                            Edit
                            <MdOutlineEdit />
                        </button>
                    </div>
                </div>
                <div className="settings-security-item">
                    <div>
                        <p>
                            Password
                        </p>
                        <p>
                            Set a unique pasword to protect your account.
                        </p>
                    </div>
                    <div>
                        <button>
                            Change Password
                        </button>
                    </div>
                </div>
                <div className="settings-security-item">
                    <div>
                        <p>
                            Delete Account
                        </p>
                        <p>
                            This will delete your account. All data and related items will be permanently gone.
                        </p>
                    </div>
                    <div>
                        <button>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SettingsSecurity