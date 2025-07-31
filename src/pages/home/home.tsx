import HomeHeader from "../../components/home/homeHeader"
import '../../assets/styles/home/home.css'
import IndexNav from "../../components/universal/navbar/indexNav"
const Home: React.FC = () => {
    return(
        <>
            <IndexNav />
            <HomeHeader />
        </>
    )
}

export default Home