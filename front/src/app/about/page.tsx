import styles from './styles.module.scss'
import PageTitle from "@/components/ui/PageTitle"


const About = async () => {
    return (
        <>
        <div className={styles.title}>
            <PageTitle title={"About"}/>
        </div>
        <div className={styles.contents}>
            <h2>Coming soon</h2>
        </div>
        </>
    )
}

export default About
