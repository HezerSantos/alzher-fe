import { Link } from "react-router-dom"
import logo from '../../../../public/favicon.svg'
const Footer: React.FC = () => {
    return(
        <>
            <footer className="page-section footer-wrapper">
                <div className="page-section__child footer-content">
                    <div className="footer-column__header">
                        <img src={logo} alt="logo" className="logo"/>
                        <h3>Hallowed Visions</h3>
                        <p>© 2025 Hallowed Visions. All rights reserved.</p>
                    </div>
                    <div>
                        <h3>Quick Links</h3>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/"}>About Us</Link>
                    </div>
                    <div>
                        <h3>Resources</h3>
                        <Link to={"/"}>Site Map</Link>
                        <Link to={"/"}>Security</Link>
                    </div>
                    <div>
                        <h3>Additional Info</h3>
                        <Link to={"/"}>Terms</Link>
                        <Link to={"/"}>Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer