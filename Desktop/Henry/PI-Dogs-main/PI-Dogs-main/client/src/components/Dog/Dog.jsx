import { useState } from "react";
import styles from "./Dog.module.css";
import { Link } from "react-router-dom";
import imgNotFound from "./../../assets/imgnotfound.jpg";

const Dog = ({ props }) => {
    const { id, name, height, weight, lifespan, image, temperament, origin } = props;

    const [imgError, setImgError] = useState(false);

    const handleImgError = () => {
        setImgError(true);
    }

    return (

        <div  className={styles.card}>
            <div className={styles.cardinner}>
                <div className={styles.cardfront}>
                <p className={styles.dogText2}>{name}</p>
                    <img onError={handleImgError} src={imgError ? imgNotFound : image} alt={name} className={styles.dogImage} />
                </div>
                <div className={styles.cardback}>
                    <p className={styles.dogTitle}>Name:</p>
                    <p className={styles.dogText}>{name}</p>
                    <p className={styles.dogTitle}>Weight:</p>
                    <p className={styles.dogText}>{weight} Kg</p>
                    <p className={styles.dogTitle}>Temperament: </p>
                    <p className={styles.dogText}>{temperament}</p>
                    <Link to={`/detail/${id}/${origin}`} >
                        <button className={styles.buttonButton}>
                            Details
                            <svg className={styles.buttonStars} viewBox="0 0 353 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M271 37.9914C289.244 33.3118 295.91 27.0769 299.991 9C305.137 29.7552 312.313 36.1206 331.104 40.1127C312.194 43.8462 305.081 49.4282 302.113 69.1041C296.925 50.845 289.057 44.9589 271 37.9914Z"></path>
                                <path d="M254.852 83.012C245.919 73.8857 239.998 72.0853 228 75.817C238.443 65.759 239.748 59.3874 235.721 47C244.325 56.8385 250.014 59.1225 262.574 54.195C253.611 63.4315 252.822 70.0469 254.852 83.012Z"></path>
                                <path d="M275.626 97.3875C278.179 88.2512 277.138 83.7734 270.281 77.4407C280.63 80.423 285.214 78.8959 291.687 71.7049C288.553 80.8937 289.197 85.4019 297.032 91.6517C287.761 89.3164 283.212 91.2658 275.626 97.3875Z"></path>
                            </svg>
                        </button>


                    </Link>
                </div>
            </div>
        </div>

    );
}
export default Dog;

/*
<div className={styles.dogContainer}>
            <center><img src={image} alt={name} className={styles.dogImage} /></center>
            <p className={styles.dogText}>Name: {name}</p>
            <p className={styles.dogText}>Height: {height} cm</p>
            <p className={styles.dogText}>Weight: {weight} Kg</p>
            <p className={styles.dogText}>Lifespan: {lifespan}</p>
            <p className={styles.dogText}>Temperament: {temperament}</p>
        </div>
        /*
        <div className={styles.dogContainer}>
            <center><img src={image} alt={name} className={styles.dogImage} /></center>
            </Link>
            <p className={styles.dogText}>Weight: {weight} Kg</p>
            <p className={styles.dogText}>Temperament: {temperament}</p>
        </div>*/