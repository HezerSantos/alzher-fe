import api from "./app.config"

interface CsrfContextType {
    csrfToken: string | null
    decodeCookie: (cookie: string) => void
    getCsrf: () => Promise<string | undefined>
}

type HandleRequestErrorType  =(
    csrfContext: CsrfContextType | null,
    status: number | undefined,
    retry: boolean,
    callback: any[],
) => void

const handleRequestError: HandleRequestErrorType = async(csrfContext, status, retry, callback) => {
    if(status === 401 ) {
        await api.get(`/api/auth/public`)
        if(retry){
            callback[0]()
        }
        return
    }
    if(status === 403 ) {
        const newCsrf = await csrfContext?.getCsrf()
        if(retry){
            callback[1](newCsrf)
        }
        return
    }
}

export default handleRequestError