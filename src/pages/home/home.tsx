import HomeHeader from "../../components/home/homeHeader"
import '../../assets/styles/home/home.css'
import IndexNav from "../../components/universal/navbar/indexNav"
import HomeFeatures from "../../components/home/homeFeatures"
import HomeOverview from "../../components/home/homeOverview"
const Home: React.FC = () => {
    return(
        <>
            <IndexNav />
            <HomeHeader />
            <HomeFeatures />
            <HomeOverview />
        </>
    )
}

export default Home