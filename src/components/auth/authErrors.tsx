import { useEffect, useMemo } from "react"

interface ErrorType {
    msg: string,
    isError: boolean
}

interface AuthErrorsProps {
    errors: (ErrorType | null)[]
}

const AuthErrors: React.FC<AuthErrorsProps> = ({errors}) => {
    const filteredErrors = useMemo(() => {
        return errors.filter((error): error is ErrorType => error !== null)
    }, [errors])

    useEffect(() => {
        console.log(filteredErrors)
    }, [filteredErrors])
    return(
        <>
        
        </>
    )
}

export default AuthErrors