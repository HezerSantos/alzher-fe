interface AuthItemProps {
    inputName: string,
    inputPlaceHolder: string,
    inputId: string,
    type: string,
    className?: string
}

const AuthItem: React.FC<AuthItemProps> = ({inputName, inputPlaceHolder, inputId, type, className}) => {
    return(
        <>
            <div className={`auth-item`}>
                <input 
                    type={type}
                    id={inputId} 
                    placeholder={inputPlaceHolder} 
                    name={inputName}
                    className={`${className}`}
                />
            </div>
        </>
    )
}

export default AuthItem