import { createContext, SetStateAction } from "react";

interface AuthContextType {
    isAuth: boolean,
    setIsAuth: React.Dispatch<SetStateAction<boolean>>,
    refresh: (retry: boolean, newCsrf?: string | null) => void,
    isAuthLoading: boolean
}



const AuthContext = createContext<AuthContextType | null>(null)


export default AuthContext