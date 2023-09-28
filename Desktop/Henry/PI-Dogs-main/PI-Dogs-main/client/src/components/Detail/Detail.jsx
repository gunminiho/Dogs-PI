import styles from "./Detail.module.css";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import imgNotFound from "./../../assets/imgnotfound.jpg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { needsUpdate } from "./../../redux/actions";

const deleteEndPoint = "http://localhost:3001/dog/delete/";


const Detail = ({ getDogs }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [doge, setDoge] = useState({});
    const { id, origin } = useParams();

    const [imgError, setImgError] = useState(false);
    const [lock, setLock] = useState(false);
    const [dbDog, setDbDog] = useState(false);

    const handleImgError = () => {
        setImgError(true);
    }

    const deleteDog = async (id) => {
        try {
            const { status } = await axios.delete(deleteEndPoint + id);
            if (status == 200) {
                alert(`${doge?.name} was deleted from our database`);
                setLock(true);
                dispatch(needsUpdate(true));
                return true;
            }
            else {
                alert("Something went wrong, please refresh this page and try again");
                return false
            }
        } catch (error) {
            console.log(error.message);
            return alert(error.message);
        }
    }

    useEffect(() => {
        async function x(id) {
            setDoge(await getDogs(id, origin));
        } x(id, origin);
        if (origin === "db")
            setDbDog(true)
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
                            <Link to={`/edit/${id}`}><button disabled={lock} className={dbDog ? styles.buttonEdit : styles.buttonEditHidden}>EDIT</button></Link>
                            <Link to="/home"><button type="button" className={styles.buttonBack}>BACK</button></Link>
                            <button onClick={() => deleteDog(id)} id="buttonDelete" name="buttonDelete" className={dbDog ? styles.buttonDelete : styles.buttonDeleteHidden}>DELETE</button>
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