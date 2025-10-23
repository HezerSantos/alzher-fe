import { Link } from "react-router-dom"


interface AuthFooterProps {
    footerText: string,
    redirect: string,
    redirectText: string
}
const AuthFooter: React.FC<AuthFooterProps> = ({footerText, redirect, redirectText}) => {
    return(
        <>
            <div className="auth-form__footer">
                <p>
                    {footerText}
                </p>
                <Link to={redirect} >{redirectText}</Link>
            </div>
        </>
    )
}

export default AuthFooter