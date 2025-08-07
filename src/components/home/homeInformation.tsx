import React from "react"

import informationImageOne from '../../assets/images/information-image-two.webp'
import chartTwo from '../../assets/images/chart-example-two.webp'

import informationImageTwo from '../../assets/images/information-image-one.webp'
import chartOne from '../../assets/images/chart-example-one.webp'
interface HomeInformationElementProps {
    imageUrl: string,
    chartUrl: string,
    heading: string,
    text: string,
    reverse?: boolean
}
const HomeInformationElement: React.FC<HomeInformationElementProps> = ({imageUrl, chartUrl, heading, text, reverse}) => {
    return(
        <>
            <div className="home-information__element">
                {reverse? (
                    <>
                        <div className="home-information__element-chart">
                            <img src={chartUrl} alt="" />
                        </div>
                        <div
                            className="home-information__element-image"
                            style={{background: `url(${imageUrl}) no-repeat center/cover`}}
                        >
                            <h1>{heading}</h1>
                            <p>{text}</p>

                            <img src={chartUrl} alt="" className="responsive-chart-image"/>
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className="home-information__element-image"
                            style={{background: `url(${imageUrl}) no-repeat center/cover`}}
                        >
                            <h1>{heading}</h1>
                            <p>{text}</p>
                            <img src={chartUrl} alt="" className="responsive-chart-image"/>
                        </div>
                        <div className="home-information__element-chart">
                            <img src={chartUrl} alt="" />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

const HomeInformation: React.FC = () => {
    return(
        <>
            <section className="page-section">
                <div className="page-section__child home-information">
                    <HomeInformationElement 
                        imageUrl={informationImageOne}
                        chartUrl={chartTwo}
                        heading="Visualize Your Finances"
                        text="Get a clear overview of your spending, income, and financial trends—all in one place. Dive into interactive dashboards designed for clarity and insight."
                    />
                    <HomeInformationElement 
                        imageUrl={informationImageTwo}
                        chartUrl={chartOne}
                        heading="Track What Matters"
                        text="Monitor your daily expenses, monthly budgets, and long-term goals. Stay informed with real-time data and smart breakdowns that actually make sense."
                        reverse={true}
                    />
                </div>
            </section>
        </>
    )
}

export default HomeInformation