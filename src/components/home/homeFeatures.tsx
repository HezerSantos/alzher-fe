import React, { ReactElement } from "react"
import { FaFileUpload } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
interface HomeFeatureProps {
    featureComponent: ReactElement,
    featureName: string
}

const HomeFeature: React.FC<HomeFeatureProps> = ({featureComponent, featureName}) => {
    return(
        <>
            <div className="home-feature">
                {featureComponent}
                <p>
                    {featureName}
                </p>
            </div>
        </>
    )
}

const HomeFeatures: React.FC = () => {
    return(
        <>
            <section className="page-section">
                <div className="page-section__child home-features">
                    <h1>What We Do</h1>
                    <div className="home-features__container">
                        <HomeFeature 
                            featureComponent={<FaFileUpload />}
                            featureName="Upload Statements"
                        />
                        <HomeFeature 
                            featureComponent={<MdOutlineDashboard />}
                            featureName="Organized Dashboards"
                        />
                        <HomeFeature 
                            featureComponent={<FaMoneyBillWave />}
                            featureName="Smarter Spending"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeFeatures