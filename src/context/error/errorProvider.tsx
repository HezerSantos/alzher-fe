import React, { ReactNode, useState } from "react";
import ErrorContext from "./errorContext";

interface ErrorProviderProps {
    children: ReactNode
}


const ErrorProvider: React.FC<ErrorProviderProps> = ({children}) => {
    const [ isError, setIsError ] = useState(false)
    return(
        <ErrorContext.Provider value={{isError, setIsError}}>
            {children}
        </ErrorContext.Provider>
    )
}

export default ErrorProvider