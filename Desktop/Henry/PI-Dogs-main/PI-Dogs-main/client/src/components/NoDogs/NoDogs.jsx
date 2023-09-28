import styles from "./NoDogs.module.css";
import NoDogsImg from "./../../assets/NoDogs.png";

const NoDogs = () => {


    return (
        <div className={styles.divText}>
            <div>
                <div className={styles.NoDogstext}>
                    <h1 className={styles.text}>No dogs found</h1>
                    <h1 className={styles.text}>Please try again</h1>
                </div>
                <img className={styles.imgNoDog} src={NoDogsImg} />
            </div>
        </div>
    )


}

export default NoDogs;