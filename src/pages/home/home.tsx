import HomeHeader from "../../components/home/homeHeader"
import '../../assets/styles/home/home.css'
import IndexNav from "../../components/universal/navbar/indexNav"
import HomeFeatures from "../../components/home/homeFeatures"
import HomeOverview from "../../components/home/homeOverview"
import HomeInformation from "../../components/home/homeInformation"
import Footer from "../../components/universal/footer/footer"
import { useContext, useEffect, useState } from "react"
import api from "../../app.config"
import handleApiError from "../../app.config.error"
import { AxiosError } from "axios"
import CsrfContext from "../../context/csrf/csrfContext"
import AuthContext from "../../context/auth/authContext"
import ErrorContext from "../../context/error/errorContext"
const Home: React.FC = () => {
    const csrfContext = useContext(CsrfContext)
    const authContext = useContext(AuthContext)
    const errorContext = useContext(ErrorContext)
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        const checkAuth = async(newCsrf?: string) => {
            try{
                setIsLoading(true)
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
            } finally {
                setIsLoading(false)
            }
        }

        if(!authContext?.isAuthState.isAuth){
            checkAuth()
        }
    }, [])
    return(
        <>
            {!isLoading && (
                <>
                    <IndexNav />
                    <HomeHeader />
                    <HomeFeatures />
                    <HomeOverview />
                    <HomeInformation />
                    <Footer />
                </>
            )}
        </>
    )
}

export default Home