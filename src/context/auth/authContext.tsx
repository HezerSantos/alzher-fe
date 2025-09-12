import { createContext, SetStateAction } from "react";

interface AuthContextType {
    isAuth: boolean,
    setIsAuth: React.Dispatch<SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType | null>(null)


export default AuthContext