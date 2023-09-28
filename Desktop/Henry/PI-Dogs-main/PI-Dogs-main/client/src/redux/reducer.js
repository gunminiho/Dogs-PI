import * as actions from "./actions";
import avgWeight, { average } from "./helpers";

const initialState = {
    apiAllDogs: [],
    filteredDogs: [],
    FilterByTemp: "All",
    FilterByOrigin: "All",
    errorInSearch: false,
    needUpdate:false,
    currentPage: 1,
    temperaments: []
};

const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case actions.ORDER:
            let orderedDogs = [];
            let allDogs = [];
            if (state.filteredDogs.length === 0)
                allDogs = state.apiAllDogs;
            else
                allDogs = state.filteredDogs
            switch (payload) {
                case "weight":
                    allDogs.forEach(dog => dog.avgWeight = average(dog.weight));
                    orderedDogs = allDogs.sort((a, b) => a.avgWeight - b.avgWeight);
                    return {
                        ...state,
                        filteredDogs: orderedDogs
                    }
                case "breed":
                    orderedDogs = allDogs.sort((a, b) => a.name.localeCompare(b.name));
                    return {
                        ...state,
                        filteredDogs: orderedDogs
                    }
                case "asc":
                    orderedDogs = allDogs.sort((a, b) => a.id - b.id);
                    return {
                        ...state,
                        filteredDogs: orderedDogs
                    }
                case "des":
                    orderedDogs = allDogs.sort((a, b) => b.id - a.id);
                    return {
                        ...state,
                        filteredDogs: orderedDogs
                    }
                case "none":
                    return {
                        ...state,
                        filteredDogs: allDogs
                    }
            }
        case actions.FILTER:
            /// SETEANDO LOS VALORES DE BUSQUEDA
            switch (payload.filterby) {
                case "temperament":
                    state.FilterByTemp = payload.value;
                    break;
                case "origin":
                    state.FilterByOrigin = payload.value;
                    break;
            }
            /// FILTRO PARA TODO LO QUE HAY EN TEMPERAMENTOS Y ORIGEN
            if (state.FilterByTemp === "All" && state.FilterByOrigin === "All") {
                return {
                    ...state,
                    filteredDogs: state.apiAllDogs,
                    errorInSearch: false,
                    currentPage: 1
                }
            }
            // FILTRO PARA SELECIONAR POR TEMPERAMENTO Y EN TODOS LOS ORIGINES
            else if (state.FilterByTemp !== "All" && state.FilterByOrigin === "All") {
                let filteredDog = [];
                filteredDog = state.apiAllDogs.filter(dog =>
                    dog.temperament !== undefined
                    && dog.temperament.includes(state.FilterByTemp)
                    // ultimo agregado
                );
                if (filteredDog.length > 0)
                    return {
                        ...state,
                        filteredDogs: filteredDog,
                        errorInSearch: false,
                        currentPage: 1
                    }
                else
                    return {
                        ...state,
                        errorInSearch: true
                    }
            }
            // FILTRO PARA SELECCIONAR TODOS LOS TEMPERAMENTOS PERO DEPEDIENDO DEL ORIGEN
            else if (state.FilterByTemp === "All" && state.FilterByOrigin !== "All") {
                let filteredDog = [];

                filteredDog = state.apiAllDogs.filter(dog =>
                    dog.temperament !== undefined
                    && dog.origin === state.FilterByOrigin);
                if (filteredDog.length > 0)
                    return {
                        ...state,
                        filteredDogs: filteredDog,
                        errorInSearch: false,
                        currentPage: 1
                    }
                else
                    return {
                        ...state,
                        errorInSearch: true
                    }
            }
            // FILTRO PARA SELECCIONAR POR TEMPERAMENTO Y POR ORIGEN CUANDO NO SON TODOS
            else if (state.FilterByTemp !== "All" && state.FilterByOrigin !== "All") {

                const filteredDog = state.apiAllDogs.filter(dog =>
                    dog.origin === state.FilterByOrigin
                    && dog.temperament !== undefined
                    && dog.temperament.includes(state.FilterByTemp)
                );
                //console.log(filteredDog);
                if (filteredDog.length > 0)
                    return {
                        ...state,
                        filteredDogs: filteredDog,
                        errorInSearch: false,
                        currentPage: 1
                    }
                else
                    return {
                        ...state,
                        errorInSearch: true
                    }
            }
        case actions.TEMPERAMENTS:
            return {
                ...state,
                temperaments: payload
            }
        case actions.APIDOGS:
            return {
                ...state,
                apiAllDogs: payload,
                currentPage: 1
            }
        case actions.GETBYNAME:
            return {
                ...state,
                filteredDogs: payload,
                currentPage: 1
            }
        case actions.BACKUP:
            return {
                ...state,
                filteredDogs: payload,
                currentPage:1

            }
        case actions.CURRENTPAGE:
            return {
                ...state,
                currentPage: payload
            }
        case actions.UPDATE:
            return {
                ...state,
                apiAllDogs: payload,
                filteredDogs:[],
                needUpdate:false
            }
            case actions.SETUPDATE:
                return {
                    ...state,
                    needUpdate:payload
                }
        default:
            return {
                ...state
            }

    }

}

export default reducer;



