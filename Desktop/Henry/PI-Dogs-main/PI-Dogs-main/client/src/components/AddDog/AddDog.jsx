import React, { useEffect, useState } from "react";
import styles from "./AddDog.module.css";
import axios from "axios";
import validateInputs from "./validation";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setApiDogs, setBackup,needsUpdate } from "./../../redux/actions";
//endpoint para la lista de temperamentos
const endPoint = "http://localhost:3001/temperaments";
const postEndPoint = "http://localhost:3001/dogs";

const AddDog = () => {
  //variable para agregar/borrar
  // useDispatch
  const dispatch = useDispatch();
  //Estados locales
  //Estado para bloquear campos del form
  const [formLocked, setFormLocked] = useState(false);
  // Estado para traer temperamentos de la DB
  const [temperaments, setTemperaments] = useState();
  // Estado para obtener los temperamentos seleccionados en el textarea
  const [listTemperaments, setListTemperaments] = useState([]);
  //Estado para escribir en el textArea
  const [textAreaValue, setTextAreaValue] = useState("");
  //Estado para obtener el temperamento seleccionado
  const [selectedTemperament, setSelectedTemperament] = useState("");
  // Estado para settear errores
  const [error, setError] = useState({
    state: false,
    message: "✔ No errors found",
  });
  const [errorData, setErrorData] = useState({
    state: false,
    message: "✔ No errors found",
  });
  const [postStatusError, setpostStatusError] = useState({
    state: false,
    message: "✔ Waiting for dog info!",
  });
  // Estado para validar campos
  const [dogModel, setDogModel] = useState({
    name: "",
    weight: "",
    height: "",
    lifespan: "",
    temperament: [],
    minWeight: "",
    maxWeight: "",
    minHeight: "",
    maxHeight: "",
    minLifespan: "",
    maxLifespan: "",
  });

  // useEffects:
  // sincroniza la lista de temperamentos

  const allTemp = useSelector((state) => state.temperaments);
  useEffect(() => {
    setTemperaments(allTemp);

    return () => {
      //dispatch(setApiDogs());
      //dispatch(setBackup());
    }
  }, []);


  //Vigila el temperamento seleccionado en el select value y lo agrega al textAreaValue
  useEffect(() => {
    setError({ state: false, message: "✔ No errors found" });

    if (!listTemperaments.includes(selectedTemperament)) {
      // verifica que el temperamento no este ya incluido en la lista
      if (selectedTemperament.trim() !== "") {
        // se verifica que no sea en blanco porque al final del useEffect al setear el estado
        // en blanco genera un cambio en el estado que vuelve a ejecutar el estado pero con la propiedad en blanco
        // y esto agrega una linea en blanco sin quererlo
        setListTemperaments([...listTemperaments, selectedTemperament]);
        // revisa si elultimo caracter del string es un salto o si el string esta vacio
        if (
          textAreaValue.charAt(textAreaValue.length - 1) === "\n" ||
          textAreaValue.length === 0
        )
          setTextAreaValue(
            (prevValue) => prevValue + selectedTemperament + "\n"
          );
        else {
          // si no tiene salto en el ultimo caracter o el string no esta vacio inserta un salto
          //escribe el nuevo valor y vuelve a insertar un salto.
          setTextAreaValue(
            (prevValue) => "\n" + prevValue + selectedTemperament + "\n"
          );
        }
        setSelectedTemperament("");
      }
    } else {
      setError({
        state: true,
        message: `¡ ${selectedTemperament} is already included in your temperaments selected !`,
      });
    }
  }, [selectedTemperament]);

  const handleSelectChange = ({ target: { value } }) => {
    setSelectedTemperament(value);
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setDogModel({
      ...dogModel,
      [name]: value,
      height: `${dogModel.minHeight} - ${dogModel.maxHeight}`,
      weight: `${dogModel.minWeight} - ${dogModel.maxWeight}`,
      lifespan: `${dogModel.minLifespan} - ${dogModel.maxLifespan}`,
    });
  };

  const newDoge = () => {
    setFormLocked(false);
    setpostStatusError({
      state: false,
      message: "✔ Waiting for dog info!",
    });
    setError({
      state: false,
      message: "✔ No errors found",
    });
    setErrorData({
      state: false,
      message: "✔ No errors found",
    });
    setTextAreaValue("");
    setListTemperaments([]);
    setDogModel({
      name: "",
      weight: "",
      height: "",
      lifespan: "",
      temperament: [],
      minWeight: "",
      maxWeight: "",
      minHeight: "",
      maxHeight: "",
      minLifespan: "",
      maxLifespan: "",
    });
  };

  const postDog = async () => {
    try {
      
      if (window.confirm("¿Are you sure everything is set to continue?") && dogModel.temperament.length === 0) {
        setpostStatusError({
          state: false,
          message: "¡You must select at least one temperament!",
        });
        return alert("Missing fields check it and try again"); // No hagas la solicitud POST si no hay temperamentos seleccionados
      } else {
        alert("OK! go back and check your fields");
      }
      const { status } = await axios.post(postEndPoint, dogModel);
      switch (status) {
        case 200:
          setpostStatusError({
            state: true,
            message:
              "¡Your doggy was saved sucessfully!, click on New Doge to add a new one",
          });
          setFormLocked(true);
          dispatch(needsUpdate(true));
          break;
        case 404:
          setpostStatusError({
            state: false,
            message: "¡Check your data, there's something missing!",
          });
          alert(postStatusError.message);
          break;
        case 500:
          setpostStatusError({
            state: false,
            message: "¡Fatal error trying to save doge info!",
          });
          alert(postStatusError.message);
          break;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!error.state && !errorData.state) {
      setDogModel((prevDogModel) => ({
        ...prevDogModel,
        temperament: listTemperaments,
      }));
      postDog();
    } else
      alert(
        "There's something wrong with your info, check your fields and try again"
      );
  };

  const deleteLast = () => {
    setError({ state: false, message: "✔ No errors found" });

    if (listTemperaments.length > 0) {
      let deletedLast = textAreaValue.split("\n");
      if (deletedLast[deletedLast.length - 1] === "") deletedLast.pop();
      deletedLast.pop();
      setListTemperaments(deletedLast);
      setTextAreaValue(deletedLast.join("\n"));
    } else {
      setError({
        state: true,
        message: `There's nothing to delete, please add a temperament`,
      });
      setTextAreaValue("");
    }
  };

  return (
    <div className={styles.divAdd}>
      <h1 className={styles.h1Tittle}>Add your Doggy to our database</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.divForm}>
          <div className={styles.divLeft}>
            <label className={styles.labelForm}>Name: </label>
            <input
              onChange={(event) => {
                validateInputs(
                  event,
                  setErrorData,
                  handleInputChange
                );
              }}
              type="text"
              name="name"
              placeholder="Breed"
              value={dogModel.name}
              disabled={formLocked}
            />
            <label className={styles.labelForm}>Min Height: </label>
            <input
              onChange={(event) => {
                validateInputs(event, setErrorData, handleInputChange);
              }}
              type="text"
              name="minHeight"
              placeholder="Min Height (cm)"
              value={dogModel.minHeight}
              disabled={formLocked}
            />
            <label className={styles.labelForm}>Max Height: </label>
            <input
              onChange={(event) => {
                validateInputs(event, setErrorData, handleInputChange);
              }}
              type="text"
              name="maxHeight"
              placeholder="Max height (cm)"
              value={dogModel.maxHeight}
              disabled={formLocked}
            />
            <label className={styles.labelForm}>Min Weight: </label>
            <input
              onChange={(event) => {
                validateInputs(event, setErrorData, handleInputChange);
              }}
              type="text"
              name="minWeight"
              placeholder="Min Weight (kg)"
              value={dogModel.minWeight}
              disabled={formLocked}
            />
            <label className={styles.labelForm}>Max Height: </label>
            <input
              onChange={(event) => {
                validateInputs(event, setErrorData, handleInputChange);
              }}
              type="text"
              name="maxWeight"
              placeholder="Max Weight (kg)"
              value={dogModel.maxWeight}
              disabled={formLocked}
            />
            <label className={styles.labelForm}>Min Lifespan: </label>
            <input
              onChange={(event) => {
                validateInputs(event, setErrorData, handleInputChange);
              }}
              type="text"
              name="minLifespan"
              placeholder="Min Lifespan"
              value={dogModel.minLifespan}
              disabled={formLocked}
            />
            <label className={styles.labelForm}>Max Lifespan: </label>
            <input
              onChange={(event) => {
                validateInputs(event, setErrorData, handleInputChange);
              }}
              type="text"
              name="maxLifespan"
              placeholder="Max Lifespan"
              value={dogModel.maxLifespan}
              disabled={formLocked}
            />
            <label className={styles.labelForm}>Image: </label>
            <input
              onBlur={(event) => {
                validateInputs(event, setErrorData, handleInputChange);
              }}
              type="text"
              name="image"
              placeholder="Image URL"
              value={dogModel.image}
              disabled={formLocked}
            />
            {errorData.state ? (
              <p className={styles.labelError}>{errorData.message}</p>
            ) : (
              <p className={styles.labelCheck}>{errorData.message}</p>
            )}
          </div>
          <div className={styles.divRight}>
            <label className={styles.labelForm} htmlFor="temperament">
              Temperament:
            </label>
            <center>
              <select
                onChange={handleSelectChange}
                name="temperament"
                id="temperament"
                disabled={formLocked}
              >
                <option disabled selected>
                  SELECT OPTION
                </option>
                {temperaments?.map((temperament, key) => {
                  return (
                    <option key={key} value={temperament}>
                      {temperament}
                    </option>
                  );
                })}
              </select>
            </center>
            <label className={styles.labelForm} htmlFor="temperaments">
              List of temperaments
            </label>
            <textarea
              onChange={handleInputChange}
              disabled
              className={styles.textAreaTemps}
              id="temperament"
              name="temperament"
              value={textAreaValue}
            />
            <br />
            <center>
              <button
                type="button"
                onClick={deleteLast}
                className={styles.buttonDelete}
                disabled={formLocked}
              >
                Delete Last
              </button>{" "}
            </center>
            {error.state ? (
              <p className={styles.labelError}> {error.message}</p>
            ) : (
              <p className={styles.labelCheck}> {error.message}</p>
            )}
          </div>

          <div
            className={
              !postStatusError.state ? styles.divDontShow : styles.divShow
            }
          >
            <div className={styles.dogContainer}>
              <img className={styles.dogImage} src={dogModel?.image} />
              <p className={styles.dogText}>Name: {dogModel?.name}</p>
              <p className={styles.dogText}>Weight: {dogModel?.height} Kg</p>
              <p className={styles.dogText}>Height: {dogModel?.weight} cm</p>
              <p className={styles.dogText}>
                Lifespan: {dogModel.lifespan} years
              </p>
              <p className={styles.dogText}>
                Temperament: {dogModel.temperament.join(", ")}
              </p>
              {!postStatusError.state ? (
                <p className={styles.labelError}>{postStatusError.message}</p>
              ) : (
                <p className={styles.labelCheck}>{postStatusError.message}</p>
              )}
            </div>
          </div>



        </div>
        <div className={styles.divButtonSend}>
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.buttonSend}
            disabled={formLocked}
          >
            Save Doge
          </button>
          <button type="reset" onClick={newDoge} className={styles.buttonSend}>
            New Doge
          </button>
          <Link to="/home"><button type="button" className={styles.buttonSend}>
            Back
          </button></Link>
        </div>
      </form>
    </div>
  );
};

export default AddDog;

