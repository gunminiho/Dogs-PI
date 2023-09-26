const axios = require("axios");
let temperamentList = new Set(); // objeto para guardar datos que no pueden repetirse por defecto.
const URL = "https://api.thedogapi.com/v1/breeds/";
const { Temperament } = require("../db");

module.exports = async (req, res) => {

    if (await Temperament.count() === 0) {
        try {
            const response = await axios.get(URL); // pidiendo datos a la API
            const { data } = response; // desestructurando la data
            if (response)
                data.forEach(element => { // iterando sobre cada temperamento
                    if (element.temperament)
                        element.temperament.split(',') // partiendo el string por las comas
                            .map(caracteristica => // mapeando cada sub string separado para quitarle el espacio
                                temperamentList.add(  // agregando a la lista Set los temperamentos
                                    caracteristica.trim())); // quitandole los espacios a los sub strings
                });
            return res.status(201).json({ temperaments: [...temperamentList] });
        } catch (error) {
            res.status(404).send(error);
        }
    }
    else {
        try {
            const response = await Temperament.findAll();
            const list = response.map(temperament => temperament.name);
            return res.status(201).json(list);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }


}