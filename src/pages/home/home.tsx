import HomeHeader from "../../components/home/homeHeader"
import '../../assets/styles/home/home.css'
import IndexNav from "../../components/universal/navbar/indexNav"
import HomeFeatures from "../../components/home/homeFeatures"
import HomeOverview from "../../components/home/homeOverview"
import HomeInformation from "../../components/home/homeInformation"
import Footer from "../../components/universal/footer/footer"
import { useEffect, useState } from "react"
import api from "../../app.config"
import handleApiError from "../../app.config.error"
import { AxiosError } from "axios"
import useGlobalContext from "../../customHooks/useContexts"
const Home: React.FC = () => {
    const globalContext = useGlobalContext()
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        const checkAuth = async(newCsrf?: string) => {
            try{
                setIsLoading(true)
                await api.get('/api/auth/secure/validate', {
                    headers: {
                        csrftoken: newCsrf? newCsrf : globalContext.csrf?.csrfToken
                    }
                })
                globalContext.auth?.setIsAuthState({isAuth: true, isAuthLoading: false})
            } catch (error) {
                const axiosError = error as AxiosError
                handleApiError({
                    axiosError: axiosError,
                    status: axiosError.status,
                    globalContext,
                    callbacks: {
                        handlePublicAuthRetry: () => checkAuth(),
                        handleCsrfRetry: (newCsrf) => checkAuth(newCsrf)
                    }
                })
            } finally {
                setIsLoading(false)
            }
        }

        if(!globalContext.auth?.isAuthState.isAuth){
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