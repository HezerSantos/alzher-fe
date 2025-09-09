interface AuthItemProps {
    inputName: string,
    inputPlaceHolder: string,
    inputId: string,
    type: string
}

const AuthItem: React.FC<AuthItemProps> = ({inputName, inputPlaceHolder, inputId, type}) => {
    return(
        <>
            <div className="auth-item">
                <input 
                    type={type}
                    id={inputId} 
                    placeholder={inputPlaceHolder} 
                    name={inputName}
                />
            </div>
        </>
    )
}

export default AuthItem