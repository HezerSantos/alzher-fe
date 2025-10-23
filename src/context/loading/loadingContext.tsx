import React, { createContext, SetStateAction } from "react";


interface LoadingContextType {
    isLoading: boolean,
    setIsLoading: React.Dispatch<SetStateAction<boolean>>
}
const LoadingContext = createContext<LoadingContextType | null>(null)


export default LoadingContext