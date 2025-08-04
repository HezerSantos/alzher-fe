import { Link } from "react-router-dom"

const HomeHeader: React.FC = () => {
    return(
        <>
        <header className="page-section home-header-wrapper">
            <div className="page-section__child home-header">
                <div className="home-header__info">
                    <h1>Manage your money with clarity and control</h1>
                    <p>Track, plan, and spend smarter — with confidence.</p>

                    <Link to={""}>
                        Get Started
                    </Link>
                </div>
            </div>
        </header>
        </>
    )
}

export default HomeHeader