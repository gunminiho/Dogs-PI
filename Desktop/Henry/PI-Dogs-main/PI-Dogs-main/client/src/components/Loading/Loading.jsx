import styles from "./Loading.module.css"


const Loading = () => {

    return (
        <div className={styles.divTotal}>
        <div className={styles.loader}>
            <div data-glitch="Loading info..." className={styles.glitch}>Loading info...</div>
        </div>
        </div>
    )
}

export default Loading;