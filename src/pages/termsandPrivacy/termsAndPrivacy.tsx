import IndexNav from "../../components/universal/navbar/indexNav"
import '../../assets/styles/termsandPrivacy/termsandPrivacy.css'
import termItems from "./helpers/terms"
import { useContext, useEffect } from "react"
import api from "../../app.config"
import handleApiError from "../../app.config.error"
import { AxiosError } from "axios"
import CsrfContext from "../../context/csrf/csrfContext"
import AuthContext from "../../context/auth/authContext"
import ErrorContext from "../../context/error/errorContext"

const TermsAndPrivacy: React.FC = () => {
    const csrfContext = useContext(CsrfContext)
    const authContext = useContext(AuthContext)
    const errorContext = useContext(ErrorContext)


    useEffect(() => {
        const checkAuth = async(newCsrf?: string) => {
            try{
                await api.get('/api/auth/secure/validate', {
                    headers: {
                        csrftoken: newCsrf? newCsrf : csrfContext?.csrfToken
                    }
                })
                authContext?.setIsAuthState({isAuth: true, isAuthLoading: false})
            } catch (error) {
                const axiosError = error as AxiosError
                handleApiError({
                    axiosError: axiosError,
                    status: axiosError.status,
                    csrfContext: csrfContext,
                    authContext: authContext,
                    errorContext: errorContext,
                    callbacks: {
                        handlePublicAuthRetry: () => checkAuth(),
                        handleCsrfRetry: (newCsrf) => checkAuth(newCsrf)
                    }
                })
            }
        }

        if(!authContext?.isAuthState.isAuth){
            checkAuth()
        }
    }, [])
    return(
        <>
            <header>
                <IndexNav />
            </header>
            <main className="tap-main page-section">
                <div className="page-section__child">
                    {termItems.map((term, index) => {
                        return(
                            <section className="tap-item" key={index}>
                                <h1>{term.header}</h1>
                                <p>{term.descriptions}</p>
                            </section>
                        )
                    })}
                </div>
            </main>
        </>
    )
}

export default TermsAndPrivacy