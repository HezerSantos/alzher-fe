import IndexNav from "../../components/universal/navbar/indexNav"
import '../../assets/styles/termsandPrivacy/termsandPrivacy.css'
import termItems from "./helpers/terms"

const TermsAndPrivacy: React.FC = () => {
    return(
        <>
            <header>
                <IndexNav />
            </header>
            <main className="tap-main page-section">
                <div className="page-section__child">
                    {termItems.map((term, index) => {
                        return(
                            <section className="tap-item" key={index}>
                                <h1>{term.header}</h1>
                                <p>{term.descriptions}</p>
                            </section>
                        )
                    })}
                </div>
            </main>
        </>
    )
}

export default TermsAndPrivacy