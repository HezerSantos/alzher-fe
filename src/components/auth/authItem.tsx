interface AuthItemProps {
    inputName: string,
    inputPlaceHolder: string,
    inputId: string
}

const AuthItem: React.FC<AuthItemProps> = ({inputName, inputPlaceHolder, inputId}) => {
    return(
        <>
            <div className="auth-item">
                <input 
                    type="text" 
                    id={inputId} 
                    placeholder={inputPlaceHolder} 
                    name={inputName}
                />
            </div>
        </>
    )
}

export default AuthItem