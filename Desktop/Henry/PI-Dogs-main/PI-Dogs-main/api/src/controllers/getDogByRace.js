const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const URL = "https://api.thedogapi.com/v1/breeds/";
const { Dog, Temperament } = require("../db");

module.exports = async (req, res) => {
    const { idRaza, origin } = req.params;
    
    try {

        let dataObj;
        if (origin === "api") {
            console.log("estoy entrando a api");
            const response = await axios.get(URL + idRaza);
            const { data } = response;
            dataObj = {
                id: data.id,
                name: data.name,
                height: data.height.metric,
                weight: data.weight.metric,
                lifespan: data.life_span,
                image: `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`,
                temperament: data.temperament
            }
        }
        else {
            console.log("estoy entrando a db");
            const response = await Dog.findOne({
                where: {
                    id: idRaza 
                },
                include: {
                    model: Temperament, // especifica la relación que deseas incluir
                    attributes: ['name'], // especifica la columnas que se desea seleccionar
                    through: { attributes: [] }, // Excluye las columnas de la tabla intermedia si no las necesitas
                  }
            });
            if (response) {
                const { dataValues } = response;
                //console.log(dataValues.temperaments);
                dataObj = {
                    id: dataValues.id,
                    name: dataValues.name,
                    height: dataValues.height,
                    weight: dataValues.weight,
                    lifespan: dataValues.lifespan,
                    image: dataValues.image,
                    temperament: dataValues.temperaments.map(temp=> temp.dataValues.name).join(", ")
                }
            }
        }
        res.status(200).json(dataObj);

    } catch (error) {
        res.status(404).send(error.message);
    }
}