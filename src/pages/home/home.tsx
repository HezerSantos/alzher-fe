import HomeHeader from "../../components/home/homeHeader"
import '../../assets/styles/home/home.css'
import IndexNav from "../../components/universal/navbar/indexNav"
import HomeFeatures from "../../components/home/homeFeatures"
import HomeOverview from "../../components/home/homeOverview"
import HomeInformation from "../../components/home/homeInformation"
import Footer from "../../components/universal/footer/footer"
const Home: React.FC = () => {
    return(
        <>
            <IndexNav />
            <HomeHeader />
            <HomeFeatures />
            <HomeOverview />
            <HomeInformation />
            <Footer />
        </>
    )
}

export default Home