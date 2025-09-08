import IndexNav from "../../components/universal/navbar/indexNav"
import '../../assets/styles/auth/auth.css'
import AuthItem from "../../components/auth/authItem"
import AuthHeader from "../../components/auth/authHeader"




const Login: React.FC = () => {
    return (
        <>
            <header>
                <IndexNav />
            </header>
            <main className="page-section auth-section">
                <form action="" className="page-section__child auth-container">
                    <div className="auth-form">
                        <AuthHeader 
                            headerText="Welcome Back"
                        />
                        <AuthItem 
                            inputName="Email"
                            inputPlaceHolder="Email Address"
                            inputId="email"
                        />
                        <AuthItem 
                            inputName="Password"
                            inputPlaceHolder="Password"
                            inputId="password"
                        />
                        <button className="auth-form__button">
                            Login
                        </button>
                    </div>
                </form>
            </main>
        </>
    )
}


export default Login