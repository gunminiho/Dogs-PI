import axios from "axios";

// Lista de acciones para el reducer
export const ORDER = "ORDER";
export const FILTER = "FILTER";
export const TEMPERAMENTS = "TEMPERAMENTS";
export const APIDOGS = "APIDOGS";
export const GETBYNAME = "GETBYNAME";
export const BACKUP = "BACKUP";
export const CURRENTPAGE = "CURRENTPAGE";
export const UPDATE = "UPDATE";
export const SETUPDATE="SETUPDATE";

// creando las actions creators

export const setCurrentPage = (page)=>{
    return {
        type: CURRENTPAGE,
        payload: page
    }
}

export const orderDogs = (order) => {

    return {
        type: ORDER,
        payload: order
    }
}

export const filterDogs = (value, filterby) => {
    return {
        type: FILTER,
        payload: { value, filterby }
    }

}

export const setTemperaments = () => {
    const endPoint = "http://localhost:3001/temperaments";
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endPoint);
            const temperamentList = data.sort();
            return dispatch({
                type: TEMPERAMENTS,
                payload: temperamentList,
            });
        } catch (error) {
            console.log(error);
            throw new Error("no hay temperamentos");
        }
    };
};

export const setApiDogs = () => {
    const getAllDogs = "http://localhost:3001/dogs";
    return async (dispatch) => {
        try {
            const { data } = await axios.get(getAllDogs);
            return dispatch({
                type: APIDOGS,
                payload: data
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export const updateDogs = () => {
    const getAllDogs = "http://localhost:3001/dogs";
    return async (dispatch) => {
        try {
            const { data } = await axios.get(getAllDogs);
            return dispatch({
                type: UPDATE,
                payload: data
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export const needsUpdate = (value) => {

    return {
        type: SETUPDATE,
        payload: value
    }
}


export const setDogsbyName = (breed) => {
    const searchByName = "http://localhost:3001/dogs/name?breed=";
    return async (dispatch) => {
        try {
            const { data } = await axios.get(searchByName + breed);
            return dispatch({
                type: GETBYNAME,
                payload: data
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export const setBackup = () => {
    const getAllDogs = "http://localhost:3001/dogs";
    return async (dispatch) => {
        try {
            const { data } = await axios.get(getAllDogs);
            return dispatch({
                type: BACKUP,
                payload: data
            });
        } catch (error) {
            console.error(error);
        }
    }
}
