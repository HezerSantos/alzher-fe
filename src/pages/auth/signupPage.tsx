import IndexNav from "../../components/universal/navbar/indexNav"
import '../../assets/styles/auth/auth.css'
import AuthItem from "../../components/auth/authItem"
import AuthHeader from "../../components/auth/authHeader"
import React, { SetStateAction, useEffect, useState } from "react"
import api from "../../app.config"
import { AxiosError } from "axios"
import { AiOutlineLoading } from "react-icons/ai";
import handleRequestError from "../../app.config.error"
import AuthFooter from "../../components/auth/authFooter"
import AuthErrors from "../../components/auth/authErrors"
import AlzherMessage from "../../components/universal/alzherMessage"
import useGlobalContext from "../../customHooks/useContexts"

interface ErrorType {
    msg: string,
    isError: boolean
}
type HandleSignupType = (
    e: React.FormEvent<HTMLFormElement>,
    globalContext: GlobalContextType,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>,
    setIsSuccess: React.Dispatch<SetStateAction<boolean>>,
    newCsrf?: string | null,
    setEmailError?: React.Dispatch<SetStateAction< ErrorType | null>>,
    setPasswordError?: React.Dispatch<SetStateAction< ErrorType | null>>,
    setConfirmPasswordError?: React.Dispatch<SetStateAction< ErrorType | null>>
) => void

const handleSignup: HandleSignupType = async(e, globalContext, setIsLoading, setIsSuccess, newCsrf, setEmailError, setPasswordError, setConfirmPasswordError) => {
    e.preventDefault()
    setIsLoading(true)
    try{
        const form = e.target as HTMLFormElement

        const emailInput = form.elements.namedItem("email") as HTMLInputElement
        const email = emailInput.value

        const passwordInput = form.elements.namedItem("password") as HTMLInputElement;
        const password = passwordInput.value;

        const confirmPasswordInput = form.elements.namedItem("confirmPassword") as HTMLInputElement;
        const confirmPassword = confirmPasswordInput.value;

        await api.post("/api/auth/secure/signup", {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }, {
            headers: {
                csrftoken: newCsrf? newCsrf : globalContext.csrf?.csrfToken
            }
        })

        if(setEmailError){
            setEmailError(null)
        }
        if(setPasswordError){
            setPasswordError(null)
        }
        if(setConfirmPasswordError){
            setConfirmPasswordError(null)
        }

        form.reset()
        setIsSuccess(true)
    } catch(error) {
        const axiosError = error as AxiosError

        await handleRequestError({
            axiosError: axiosError,
            status: axiosError.status,
            globalContext,
            callbacks: {
                handlePublicAuthRetry: () => handleSignup(e, globalContext, setIsLoading, setIsSuccess, null, setEmailError, setPasswordError, setConfirmPasswordError),
                handleCsrfRetry: (newCsrf) => handleSignup(e, globalContext, setIsLoading, setIsSuccess, newCsrf, setEmailError, setPasswordError, setConfirmPasswordError)
            },
            setStateErrors: [
                {
                    errorName: "email",
                    setState: setEmailError
                },
                {
                    errorName: "password",
                    setState: setPasswordError
                },
                {
                    errorName: "confirmPassword",
                    setState: setConfirmPasswordError
                }
            ]
        })
    } finally {
        setIsLoading(false)
    }
}



const Signup: React.FC = () => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ emailError, setEmailError ] = useState<ErrorType | null>(null)
    const [ passwordError, setPasswordError ] = useState<ErrorType | null>(null)
    const [ confirmPasswordError, setConfirmPasswordError ] = useState<ErrorType | null>(null)
    const [ isSuccess, setIsSuccess ] = useState(false)
    const globalContext = useGlobalContext()
    useEffect(() => {
        if(isSuccess){
            const inteveral = setTimeout(() => {
                setIsSuccess(false)
            }, 5000)

            return () => clearTimeout(inteveral)
        }
    }, [isSuccess])
    return(
        <>
            <header>
                <IndexNav />
            </header>
            <main className="page-section auth-section">
                <form
                    className="page-section__child auth-container"
                    onSubmit={(e) => handleSignup(e, globalContext, setIsLoading, setIsSuccess, null, setEmailError, setPasswordError, setConfirmPasswordError)}
                >
                    {isSuccess && (
                        <AlzherMessage 
                            msg="Your account has been created successfully!"
                        />
                    )}
                    <div className="auth-form">
                        <AuthHeader 
                            headerText="Sign Up"
                        />
                        {(emailError?.isError || passwordError?.isError || confirmPasswordError?.isError) && (
                            <AuthErrors 
                                errors={[emailError, passwordError, confirmPasswordError]}
                            />
                        )}
                        <AuthItem 
                            inputName="email"
                            inputPlaceHolder="Email Address"
                            inputId="email"
                            type="text"
                            className={emailError? "input-error" : ""}
                        />
                        <AuthItem 
                            inputName="password"
                            inputPlaceHolder="Password"
                            inputId="password"
                            type="password"
                            className={passwordError? "input-error" : ""}
                        />
                        <AuthItem 
                            inputName="confirmPassword"
                            inputPlaceHolder="Confirm Password"
                            inputId="confirmPassword"
                            type="password"
                            className={confirmPasswordError? "input-error" : ""}
                        />
                        <button className="auth-form__button" type="submit" disabled={isLoading}>
                            {!isLoading? (
                                <>
                                    Sign up
                                </>
                            ) : (
                                <AiOutlineLoading className="button-loading"/>
                            )}
                        </button>
                        <AuthFooter 
                            footerText="Already on alzher?"
                            redirect="/login"
                            redirectText="Login"
                        />
                    </div>
                </form>
            </main>
        </>
    )
}

export default Signup