import IndexNav from "../../components/universal/navbar/indexNav"
import '../../assets/styles/auth/auth.css'
import AuthItem from "../../components/auth/authItem"
import AuthHeader from "../../components/auth/authHeader"
import React, { SetStateAction, useContext, useState } from "react"
import AuthFooter from "../../components/auth/authFooter"
import api from "../../app.config"
import { AxiosError } from "axios"
import { AiOutlineLoading } from "react-icons/ai";
import handleRequestError from "../../app.config.error"
import CsrfContext from "../../context/csrf/csrfContext"
import AuthErrors from "../../components/auth/authErrors"
import AuthContext from "../../context/auth/authContext"
import { NavigateFunction, useNavigate } from "react-router-dom"
interface CsrfContextType {
    csrfToken: string | null
    decodeCookie: (cookie: string) => void
    getCsrf: () => Promise<string | undefined>
}

interface AuthContextType {
    refresh: (retry: boolean, newCsrf?: string | null) => void,
    isAuthState: {isAuth: boolean, isAuthLoading: boolean},
    setIsAuthState: React.Dispatch<SetStateAction<{isAuth: boolean, isAuthLoading: boolean}>>
}


interface ErrorType {
    msg: string,
    isError: boolean
}

type HandleLoginType = (
    e: React.FormEvent<HTMLFormElement>,
    navigate: NavigateFunction,
    authContext: AuthContextType | null,
    csrfContext: CsrfContextType | null,
    retry: boolean,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>,
    newCsrf?: string | null,
    setEmailError?: React.Dispatch<SetStateAction< ErrorType | null>>,
    setPasswordError?: React.Dispatch<SetStateAction< ErrorType | null>>,
) => void

const handleLogin: HandleLoginType = async(e, navigate, authContext, csrfContext, retry, setIsLoading, newCsrf, setEmailError, setPasswordError) => {
    e.preventDefault()

    try{
        setIsLoading(true)
        const form = e.target as HTMLFormElement

        const emailInput = form.elements.namedItem("email") as HTMLInputElement
        const passwordInput = form.elements.namedItem("password") as HTMLInputElement


        const email = emailInput.value
        const password = passwordInput.value

        await api.post("/api/auth/secure/login", {
            email,
            password
        }, {
            headers: {
                csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
            }
        })

        if(setEmailError){
            setEmailError(null)
        }
        if(setPasswordError){
            setPasswordError(null)
        }
        form.reset()
        authContext?.setIsAuthState({isAuth: true, isAuthLoading: false})
        navigate("/dashboard")
    } catch (error) {
        const axiosError = error as AxiosError

        handleRequestError(axiosError, csrfContext, axiosError.status, retry, 
            [
                () => handleLogin(e, navigate, authContext, csrfContext, true, setIsLoading, newCsrf, setEmailError, setPasswordError),
                (newCsrf: string) => handleLogin(e, navigate, authContext, csrfContext, false, setIsLoading, newCsrf, setEmailError, setPasswordError)
            ],
            [
                {
                    errorName: "email",
                    setState: setEmailError
                },
                {
                    errorName: "password",
                    setState: setPasswordError
                }
            ]

        )
    } finally {
        setIsLoading(false)
    }
}

const Login: React.FC = () => {
    const csrfContext = useContext(CsrfContext)
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ emailError, setEmailError ] = useState<ErrorType | null>(null)
    const [ passwordError, setPasswordError ] = useState<ErrorType | null>(null)


    return (
        <>
            <header>
                <IndexNav />
            </header>
            <main className="page-section auth-section">
                <form 
                    className="page-section__child auth-container"
                    onSubmit={(e) => handleLogin(e, navigate, authContext, csrfContext, true, setIsLoading, null, setEmailError, setPasswordError)}
                >
                    <div className="auth-form">
                        <AuthHeader 
                            headerText="Welcome Back"
                        />
                        { (emailError || passwordError) && (
                            <AuthErrors 
                                errors={[{msg: "Invalid Username or Password", isError: true}]}
                            />
                        )}
                        <AuthItem 
                            inputName="Email"
                            inputPlaceHolder="Email Address"
                            inputId="email"
                            type="text"
                            className={(emailError || passwordError)? "input-error" : ""}
                        />
                        <AuthItem 
                            inputName="Password"
                            inputPlaceHolder="Password"
                            inputId="password"
                            type="password"
                            className={(emailError || passwordError)? "input-error" : ""}
                        />
                        <button className="auth-form__button" type="submit" disabled={isLoading}>
                            {!isLoading? (
                                <>
                                    Login
                                </>
                            ) : (
                                <AiOutlineLoading className="button-loading"/>
                            )}
                        </button>
                        <AuthFooter 
                            footerText="New to alzher?"
                            redirect="/signup"
                            redirectText="Signup"
                        />
                    </div>
                </form>
            </main>
        </>
    )
}


export default Login