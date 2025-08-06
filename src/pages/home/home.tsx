import HomeHeader from "../../components/home/homeHeader"
import '../../assets/styles/home/home.css'
import IndexNav from "../../components/universal/navbar/indexNav"
import HomeFeatures from "../../components/home/homeFeatures"
const Home: React.FC = () => {
    return(
        <>
            <IndexNav />
            <HomeHeader />
            <HomeFeatures />
        </>
    )
}

export default Home