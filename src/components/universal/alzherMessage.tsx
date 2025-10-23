interface AlzherMessageProps {
    msg: string,
    error?: boolean
}
const AlzherMessage: React.FC<AlzherMessageProps> = ({msg, error}) => {
    return(
        <>
            <div className={`alzher-message ${error? 'alzher-error' : ''}`}>
                <p>
                    {!error? (
                        msg
                    ) : (
                        <>
                            <span>Error:</span> {msg}
                        </>
                    )}
                </p>
            </div>
        </>
    )
}

export default AlzherMessage