import IndexNav from "../../components/universal/navbar/indexNav"
import '../../assets/styles/auth/auth.css'
import AuthItem from "../../components/auth/authItem"
import AuthHeader from "../../components/auth/authHeader"
import React from "react"
import AuthFooter from "../../components/auth/authFooter"

type HandleLoginType = (
    e: React.FormEvent<HTMLFormElement>
) => void

const handleLogin: HandleLoginType = (e) => {
    e.preventDefault()

    try{
        const form = e.target as HTMLFormElement

        const emailInput = form.elements.namedItem("email") as HTMLInputElement
        const passwordInput = form.elements.namedItem("password") as HTMLInputElement


        const email = emailInput.value
        const password = passwordInput.value

        console.log(email, password)
        
    } catch (e) {
        console.error(e)
    }
}

const Login: React.FC = () => {
    return (
        <>
            <header>
                <IndexNav />
            </header>
            <main className="page-section auth-section">
                <form 
                    className="page-section__child auth-container"
                    onSubmit={(e) => handleLogin(e)}
                >
                    <div className="auth-form">
                        <AuthHeader 
                            headerText="Welcome Back"
                        />
                        <AuthItem 
                            inputName="Email"
                            inputPlaceHolder="Email Address"
                            inputId="email"
                            type="text"
                        />
                        <AuthItem 
                            inputName="Password"
                            inputPlaceHolder="Password"
                            inputId="password"
                            type="password"
                        />
                        <button className="auth-form__button" type="submit">
                            Login
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