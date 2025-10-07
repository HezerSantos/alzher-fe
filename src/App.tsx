import { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import CsrfContext from './context/csrf/csrfContext'
import api from './app.config'
import DashboardProvider from './context/dashboard/dashboardProvider'
import AuthProvider from './context/auth/authProvider'
import ErrorContext from './context/error/errorContext'
import Error500 from './pages/errors/error500'

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
        console.error(e)
      }
    }
    getCredentials()
  }, [])

  if(errorContext?.isError){
    return <Error500 />
  }
  
  return (
    <>
      {!isLoading && (
        <AuthProvider>
            <DashboardProvider>
              <Outlet />
            </DashboardProvider>
        </AuthProvider>
      )}
    </>
  )
}

export default App