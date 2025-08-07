import { Link } from "react-router-dom"
import { FaLongArrowAltRight } from "react-icons/fa";
const HomeOverview: React.FC = () => {
    return(
        <>
            <section className="page-section">
                <div className="page-section__child home-overview">
                    <div>
                        <h1>Track Your Money, Shape Your Future</h1>

                        <p>
                            Gain clarity on your finances today and take control of your financial goals for tomorrow.
                        </p>

                        <Link to={""}>Learn More <FaLongArrowAltRight /></Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeOverview