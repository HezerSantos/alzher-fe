import React, { useMemo } from "react"

interface ErrorType {
    msg: string,
    isError: boolean
}

interface AuthErrorsProps {
    errors: (ErrorType | null)[]
}

interface AuthErrorItemProps {
    msg: string
}

const AuthErrorItem: React.FC<AuthErrorItemProps> = ({msg}) => {
    return(
        <>
            <p>- {msg}</p>
        </>
    )
}

const AuthErrors: React.FC<AuthErrorsProps> = ({errors}) => {
    const filteredErrors = useMemo(() => {
        return errors.filter((error): error is ErrorType => error !== null)
    }, [errors])

    return(
        <>
            <div className="auth-form__errors">
                {filteredErrors.map((error, index) => {
                    return(
                        <AuthErrorItem 
                            key={index}
                            msg={error.msg}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default AuthErrors