interface AlzherMessageProps {
    msg: string
}
const AlzherMessage: React.FC<AlzherMessageProps> = ({msg}) => {
    return(
        <>
            <div className="alzher-message">
                <p>{msg}</p>
            </div>
        </>
    )
}

export default AlzherMessage