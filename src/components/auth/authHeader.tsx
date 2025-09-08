interface AuthHeaderProps {
    headerText: string
}

const AuthHeader: React.FC<AuthHeaderProps> = ({headerText}) => {
    return(
        <>
            <div className="auth-form__header">
                <p>Please Enter Your Details</p>
                <h1>
                    {headerText}
                </h1>
            </div>
        </>
    )
}

export default AuthHeader