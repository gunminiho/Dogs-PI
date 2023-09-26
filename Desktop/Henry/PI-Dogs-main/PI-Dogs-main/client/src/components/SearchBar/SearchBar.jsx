import React, { useState } from "react";
import styles from "./SearchBar.module.css"
import dogeImage from "../../assets/doge.avif";
import { useDispatch } from "react-redux";
import { setDogsbyName, setBackup } from "../../redux/actions";
import { NavLink, useParams } from "react-router-dom";

const SearchBar = () => {

    const dispatch = useDispatch();
    const [breed, setBreed] = useState();
    const handleSearch = ({ target: { value } }) => {
        setBreed(value);
    }

    const getByBreed = () => {
        dispatch(setDogsbyName(breed));
    }
    const resetDogs = () => {
        dispatch(setBackup());
    }

    return (
        <div className={styles.divSearchBar}>
            <NavLink to="/home"><img src={dogeImage} className={styles.imgDoge} /></NavLink>
            <button onClick={resetDogs} name="buttonSearchDog" className={styles.buttonReset}>Reset</button>
            <button onClick={getByBreed} name="buttonSearchDog" className={styles.buttonReset}>Search</button>
            <div className={styles.inputSearchcontainer}>
                <input placeholder="Enter doggy name" id="inputSearchDog" onChange={handleSearch} className={styles.inputSearch} name="inputSearchDog" type="text" />
                <label className={styles.label} htmlFor="input">Enter name...</label>
                <div className={styles.topline}></div>
                <div className={styles.underline}></div>
            </div>
            <label htmlFor="inputSearchDog">Search Doggy : </label>
        </div>
    )
}

export default SearchBar;

/*
 <input onChange={handleSearch} id="inputSearchDog" name="inputSearchDog" className={styles.divInput} />
*/