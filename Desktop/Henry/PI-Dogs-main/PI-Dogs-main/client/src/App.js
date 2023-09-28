import styles from './App.css';
import Dogs from './components/Dogs/Dogs';
import Landing from "./components/Landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import Detail from "./components/Detail/Detail";
import AddDog from "./components/AddDog/AddDog";
import Loading from "./components/Loading/Loading";
import EditDog from './components/EditDog/EditDog';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setTemperaments, setApiDogs } from "./redux/actions";

import axios from "axios";

//CONSTANTES DE FRONT
const getAllDogs = "http://localhost:3001/dogs";
const getDogById = "http://localhost:3001/dogs/";

function App() {

  // declarando un estado para Dogs
  const location = useLocation();

  const dispatch = useDispatch();

  //funcion para traer dogs
  const getDogs = async (id = 0, origin="All") => {
    if (id === 0)
      try {
        const { data } = await axios.get(getAllDogs);
        //setDoggy([...data]);
        return data;
      } catch (error) {
        console.error("Error al obtener datos de perros:", error.message);
      }
    ///Get dog by ID
    try {
      const { data } = await axios.get(getDogById + id+"/"+origin);
      return data;
    } catch (error) {
      console.error("Error al obtener datos del perro:", error.message);
    }
  }

  useEffect(() => {
    dispatch(setTemperaments());
    dispatch(setApiDogs());
  }, []);

  return (
    <div >
      {location.pathname !== "/" ? <NavBar /> : null}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Dogs />} />
        <Route path='/detail/:id/:origin' element={<Detail getDogs={getDogs} />} />
        <Route path='/add' element={<AddDog />} />
        <Route path='/edit/:id' element={<EditDog />}/>
      </Routes>
    </div>
  );
}

export default App;
