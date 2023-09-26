import styles from "./Detail.module.css";
import { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import imgNotFound from "./../../assets/imgnotfound.jpg";
import axios from "axios";

const deleteEndPoint = "http://localhost:3001/dog/delete/";


const Detail = ({ getDogs }) => {

    const [doge, setDoge] = useState({});
    const {id,origin} = useParams();

    const [imgError, setImgError] = useState(false);

    const handleImgError = () => {
        setImgError(true);
    }

    const deleteDog = async(id) =>{
        try {
            const {status} = await axios.delete(deleteEndPoint+id);
                if(status==200)
                    return alert(`${doge?.name} was deleted from our database`);
                else
                    return alert("Something went wrong, please refresh this page and try again");
        } catch (error) {
            console.log(error.message);
            return alert(error.message);
        }
    }

    useEffect(() => {
        async function x(id) {
            setDoge(await getDogs(id,origin));
        } x(id,origin);
    }, []);

    return (
        <div className={styles.divTotal}>
        <div className={styles.divDetail}>
            <div>
                <div className={styles.divText}>
                    <p className={styles.dogText}>Name : {doge?.name}</p>
                    <p className={styles.dogText}>Height : {doge?.height} cm</p>
                    <p className={styles.dogText}>Weight : {doge?.weight} Kg</p>
                    <p className={styles.dogText}>Lifespan : {doge?.lifespan} Kg</p>
                    <p className={styles.dogText}>Temperament :</p>
                    <p className={styles.dogText}>{doge?.temperament}</p>
                    <div className={styles.divButtons}>
                    <Link to="/home"><button className={styles.buttonBack}>BACK</button></Link>
                    <button className={styles.buttonBack}>EDIT</button>
                    <Link to="/home"><button className={styles.buttonBack}>DELETE</button></Link>
                    </div>
                </div>
            </div>
            
            <div className={styles.divImg} ><img onError={handleImgError} src={imgError ? imgNotFound : doge.image} alt={doge.name} className={styles.dogImage} /></div>

        </div>
        </div>
    )
}

export default Detail;

/*{   
    { id,
     name,
     height,
     weight,
     lifespan,
     temperament,
     image
     }

     className={styles.dogContainer}

     <img src={doge?.image} alt={doge?.name} className={styles.dogImage} />
     
 }*/