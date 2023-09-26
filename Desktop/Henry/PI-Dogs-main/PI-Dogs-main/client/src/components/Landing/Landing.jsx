import React from "react";
import styles from "./Landing.module.css"
//import doggyImg from "../../assets/landing.jpg"
import dogStyles from "./DogAnimation.module.css";
import { Link } from "react-router-dom";

const Landing = () => {

    return (
        <div>
            <br />
            <div className={styles.landingBody}>
                <center><h1 className={styles.landingH1}>Welcome to the Doggy Explorer Project</h1></center>

                <div className={dogStyles.divTotal}>
                    <div className={dogStyles.divDog}>
                    <div className={dogStyles.divBody}></div>
                    <div className={dogStyles.divLeg1}></div>
                    <div className={dogStyles.divLeg2}></div>
                    <div className={dogStyles.divLeg3}></div>
                    <div className={dogStyles.divLeg4}></div>
                    <div className={dogStyles.divTail}></div>
                    <div className={dogStyles.divEar}></div>
                    <div className={dogStyles.divNose}></div>
                    <div className={dogStyles.divEye}></div>
                    <div className={dogStyles.divTounge}></div>
                </div>
                </div>
                
                <div className={styles.landingText}>  
                <p className={styles.landingP}>Dear Dog Lovers,

                    Welcome to "Unleash the Breeds," your gateway to the captivating world of dog breeds.
                    Whether you're a seasoned enthusiast or a curious newcomer, our platform is designed for you.</p>

                <p className={styles.landingP}>Discover the elegance of the Afghan Hound, the playfulness of the Labrador Retriever,
                    and the charm of the Shiba Inu. Each breed profile offers insights, captivating visuals, and heartwarming stories.</p>

                <p className={styles.landingP}>Our user-friendly interface ensures a seamless experience. We've made learning about dogs as enjoyable as a game of fetch,
                    with a perfect blend of sophistication and fun in our language.</p>

                <p className={styles.landingP}>Take a virtual leash, explore our pages, and immerse yourself in canine magic.
                    We're here to celebrate the love, loyalty, and charm of dogs. Let's uncover each breed's unique characteristics and stories,
                    one paw print at a time.</p>

                <center><p className={styles.landingP}>Join us on this exciting journey. </p></center>
                <center><p className={styles.landingP}> Welcome to "Unleash the Breeds" – where tails wag with joy,
                    and the love for dogs knows no bounds.</p></center>
                <br />
                <center><Link to="/home"><button className={styles.landingButton}>EXPLORE DOGGES!</button></Link></center>
                </div>
            </div>


        </div>
    );
}

export default Landing;

