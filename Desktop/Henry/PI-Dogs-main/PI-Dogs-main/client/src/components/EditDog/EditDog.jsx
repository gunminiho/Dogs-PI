import { useEffect, useState } from "react";
import styles from "./EditDog.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import imgNotFound from "./../../assets/imgnotfound.jpg";
import { checkImg, splitNum } from "./validation.js"
import axios from "axios";
import { needsUpdate } from "./../../redux/actions";
const updateEndPoint = "http://localhost:3001/dog/update/";
const Temp = new Set();


const EditDog = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch= useDispatch();
    const { temperaments, apiAllDogs } = useSelector(state => state);
    const dogFound = apiAllDogs.find(dog => dog.id === Number(id) && dog.origin === "db");

    useEffect(() => {
        dogFound.temperament.split(", ").forEach(element => {
            Temp.add(element);
        });;
    }, [])

    const [imgError, setImgError] = useState(false);
    const [lock, setLock] = useState(false);
    const [dogModel, setDogModel] = useState({
        id: dogFound.id,
        name: dogFound.name,
        height: dogFound.height,
        minHeight: splitNum(dogFound.height)[0],
        maxHeight: splitNum(dogFound.height)[1],
        weight: dogFound.weight,
        minWeight: splitNum(dogFound.weight)[0],
        maxWeight: splitNum(dogFound.weight)[1],
        lifespan: dogFound.lifespan,
        minLifespan: splitNum(dogFound.lifespan)[0],
        maxLifespan: splitNum(dogFound.lifespan)[1],
        temperament: [...dogFound.temperament.split(", ")],
        image: dogFound.image,
        origin: "db"
    });
    const [error, setError] = useState({
        type: false,
        message: "✔ No errors found!"
    });

    const getTemperaments = () => {
        return dogModel.temperament.join("\n");
    }

    const handleImgError = () => {
        setImgError(!imgError);
        //alert(imgError);
    }

    const deleteLast = (event) => {
        event.preventDefault();
        if (Temp.size >= 1 && dogModel.temperament.length >= 1) {
            const deleted = dogModel.temperament[dogModel.temperament.length - 1];
            const x = Temp.delete(deleted.trim());
            setDogModel({
                ...dogModel,
                temperament: [...dogModel.temperament.slice(0, -1)] // Elimina el último elemento del array
            });
        } else {
            setError({
                type: true,
                message: "ⓧ There's nothing to delete!, please add a temperament"
            });
        }
    }
    const handleTemperament = (event) => {
        event.preventDefault();
        //console.log(Temp.has(event.target.value));
        if (!Temp.has(event.target.value)) {
            Temp.add(event.target.value);
            //console.log("Temp en if: ",Temp);
            setDogModel({
                ...dogModel,
                temperament: [...Temp]
            });
            setError({
                type: false,
                message: "✔ No errors found!"
            });
        } else {
            setError({
                type: true,
                message: "ⓧ Temperament is already selected!"
            });
        }

    }
    const handleData = (event) => {
        event.preventDefault();
        try {
            setDogModel({
                ...dogModel,
                [event.target.name]: event.target.value,
                height: `${dogModel.minHeight} - ${dogModel.maxHeight}`,
                weight: `${dogModel.minWeight} - ${dogModel.maxWeight}`,
                lifespan: `${dogModel.minLifespan} - ${dogModel.maxLifespan}`
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(dogModel.id && dogModel.name && dogModel.height && dogModel.weight && dogModel.lifespan && dogModel.image && dogModel.temperament && window.confirm("¿Are you sure you want to update this dog?"))
        try {
            const response = await axios.put(updateEndPoint, dogModel)
            if (response.status === 200)
                setError({
                    type: false,
                    message: "✔ Your doggy was updated sucessfully!"
                });
                dispatch(needsUpdate(true));
        } catch (error) {
            console.log(error);
            setError({
                type: true,
                message: `ⓧ Error found trying to update: ${error.message}`
            });
        }
        else{
            alert("Please check your data and try again");
        }
    }

    const cancel = (event) => {
        if(window.confirm("¿Are you sure you want exit?"))
        navigate(`/detail/${id}/db`);
        else
        return false;
    }

    return (
        <div className={styles.divEdit}>
            <center><div className={styles.divFormControl}>
                <div className={styles.h1}>
                    <h1 >Edit your doggy</h1>
                </div>
                <form className={styles.divForm}>
                    <div className={styles.divData}>
                        <div className={styles.divDataChar}>
                            <div className={styles.divInput}>
                                <label>Name: </label><input value={dogModel.name} onChange={handleData} name="name" type="text" className={styles.inputCharName} />
                            </div>
                            <div className={styles.divInput}>
                                <div>
                                    <center><label>Height: </label></center>
                                </div>
                                <label>min</label><input onChange={handleData} value={dogModel.minHeight} name="minHeight" className={styles.inputChar} type="number" /> <label>max</label><input onChange={handleData} value={dogModel.maxHeight} name="maxHeight" className={styles.inputChar} type="number" />
                            </div>
                            <div className={styles.divInput}>
                                <div>
                                    <center><label>Weight: </label></center>
                                </div>
                                <label>min </label><input onChange={handleData} value={dogModel.minWeight} name="minWeight" className={styles.inputChar} type="number" /> <label>max</label> <input onChange={handleData} value={dogModel.maxWeight} name="maxWeight" className={styles.inputChar} type="number" />
                            </div>
                            <div className={styles.divInput}>
                                <div>
                                    <center><label>Lifespan</label></center>
                                </div>
                                <label>min</label><input onChange={handleData} value={dogModel.minLifespan} name="minLifespan" className={styles.inputChar} type="number" /> <label>max</label> <input onChange={handleData} value={dogModel.maxLifespan} name="maxLifespan" className={styles.inputChar} type="number" />
                            </div>
                            <div className={styles.divInput}>
                                <label>Image: </label><input onBlur={() => setImgError(checkImg(dogModel.image))} onChange={handleData} value={dogModel.image} name="image" type="text" className={styles.inputCharName} />
                            </div>
                            <div className={styles.divInput}>
                                <button onClick={handleSubmit} className={styles.button}>Save</button>
                                <button onClick={cancel} className={styles.button}>Cancel</button>
                            </div>
                        </div>
                        <div className={styles.divDataTemp}>
                            <center>
                                <div className={styles.labelTemperament}>
                                    <label htmlFor="txtAreaTemperament" className={styles.labelTemperament}>Temperament: </label><br></br>
                                    <select name="temperament" onChange={handleTemperament} className={styles.selectTemperament}>
                                        {temperaments.map((temperament, key) => {
                                            return (
                                                <option key={key} value={temperament}>{temperament}</option>
                                            )
                                        }
                                        )}
                                    </select>
                                    <br />
                                    <textarea value={getTemperaments()} name="txtAreaTemperament" readOnly={true} id="txtAreaTemperament" className={styles.textArea} />
                                </div>
                                <button onClick={deleteLast} className={styles.buttonDelete}>Delete Last</button>
                            </center>
                        </div>
                    </div>
                    <div className={styles.divImg}>
                        <img className={styles.imgDog} onError={handleImgError} src={dogModel.image !== "" && !imgError ? dogModel.image : (imgNotFound)} />
                    </div>
                </form >
                <div className={!error.type ? styles.divErrorGreen : styles.divErrorRed}>
                    <center><h1>{error.message}</h1></center>
                </div>
            </div></center>
        </div >
    );

}

export default EditDog;