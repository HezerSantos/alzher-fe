import { useContext, useEffect } from "react"
import LoadingScreen from "../helpers/loadingScreen"
import AuthContext from "../../context/auth/authContext"
import api from "../../app.config"
import { useNavigate } from "react-router-dom"

const Logout: React.FC = () => {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        const logout = async() => {
            try{
                await api.post("/api/auth/public/logout")

                authContext?.setIsAuthState({isAuth: false, isAuthLoading: false})
                navigate("/")
            } catch (error) {

            }
        }

        logout()
    }, [])
    return(
        <LoadingScreen />
    )
}

export default Logout