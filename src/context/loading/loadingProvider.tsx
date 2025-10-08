import { ReactNode, useContext, useState } from "react"
import LoadingContext from "./loadingContext"

interface LoadingProviderType{
    children: ReactNode
}


export const LoadingProvider: React.FC<LoadingProviderType> = ({children}) => {
    const [ isLoading, setIsLoading ] = useState(false)

    return(
        <LoadingContext.Provider value={{isLoading, setIsLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => {
    const loadingContext = useContext(LoadingContext)


    return loadingContext
}