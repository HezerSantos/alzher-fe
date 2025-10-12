import { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import CsrfContext from './context/csrf/csrfContext'
import api from './app.config'
import DashboardProvider from './context/dashboard/dashboardProvider'
import AuthProvider from './context/auth/authProvider'
import ErrorContext from './context/error/errorContext'
import Error500 from './pages/errors/error500'
import { AxiosError } from 'axios'
import GlobalError from './components/universal/globalError'

function App() {
  const csrfContext = useContext(CsrfContext)
  const errorContext = useContext(ErrorContext)
  const [ isLoading, setIsLoading ] = useState(true)
  useEffect(() => {
    if (import.meta.env.MODE === 'production') {
      console.warn = () => {}
      console.error = () => {}
      console.info = () => {}
      console.debug = () => {}
    }
  }, [])

  useEffect(() => {
    const getCredentials = async() => {
      try{
        await api.get(`/api/auth/public`)
        await api.get(`/api/csrf`)
        csrfContext?.decodeCookie("__Secure-auth.csrf")
        setIsLoading(false)
      } catch(e){
        const axiosError = e as AxiosError
        if(axiosError.code === "ERR_NETWORK"){
          errorContext?.setError({isError: false, status: null})
        }
      }
    }
    if(!errorContext?.error.status){
      getCredentials()
    }
  }, [errorContext?.error])

  if(errorContext?.error.isError && errorContext.error.status === 500){
    return <Error500 />
  }
  
  return (
    <>
      {!isLoading && (
        <AuthProvider>
            <DashboardProvider>
              {errorContext?.error.isError && <GlobalError />}
              <Outlet />
            </DashboardProvider>
        </AuthProvider>
      )}
    </>
  )
}

export default App