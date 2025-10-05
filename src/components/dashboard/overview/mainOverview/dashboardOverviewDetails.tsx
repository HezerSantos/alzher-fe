interface DashboardOverviewDetailsProps {
    header: string,
    price: number,
    details?: {
        heading: string,
        value: string
    }[]
}

const DashboardOverviewDetails: React.FC<DashboardOverviewDetailsProps> = ({header, price, details}) => {
    return(
        <>
            <div className="dashboard-overview__details-item">
                <h1>{header}</h1>
                <p className="do__details-item__price">$ {price}</p>
                {details?.map((detail, index) => {
                    return(
                        <p
                        key={index}
                        className="do__details-item__detail"
                        >
                            {detail.heading}: {detail.value}
                        </p>
                    )
                })}
            </div>
        </>
    )
}

export default DashboardOverviewDetails