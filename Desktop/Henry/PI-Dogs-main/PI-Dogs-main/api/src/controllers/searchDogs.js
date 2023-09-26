require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds/search?q=";
const { Dog, Temperament } = require("../db");
const { Op } = require('sequelize');
//const Op = require('sequelize').Op;
//const Sequelize = require('sequelize');

module.exports = async (req, res) => {
    const { breed } = req.query;
    let dataObj = [];
    //console.log("Estoy buscando los perros");
    //console.log(URL+breed+"api_key="+API_KEY);
    try {
        if (breed) {
            const { data } = await axios.get(URL + breed + "&api_key=" + API_KEY);
            if (data) {
                
                data.map(dog =>
                    dataObj.push({
                        id: dog.id,
                        name: dog.name,
                        height: dog.height.metric,
                        weight: dog.weight.metric,
                        lifespan: dog.life_span,
                        image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
                        temperament: dog.temperament,
                        origin: "api"
                    })
                );
                
            }
            const dataDB = await Dog.findAll({
                where: {
                    name:{
                    [Op.iLike]: `%${breed}%`,
                }
                },
                include: [
                    {
                        model: Temperament,
                        attributes: ['name'], // Puedes especificar las columnas que deseas seleccionar
                        through: { attributes: [] }, // Excluye las columnas de la tabla intermedia si no las necesitas
                    },
                ],
            });
            if (dataDB)
                dataDB.map((dog, key) => {
                    dataObj.push({
                        id: dog.id,
                        name: dog.name,
                        height: dog.height,
                        weight: dog.weight,
                        lifespan: dog.lifespan,
                        image: dog.image,
                        temperament: dog.temperaments.map(temp => temp.dataValues.name).join(", "),
                        origin: "db"
                    })
                });
            console.log("Hay ",dataObj.length, "datos en la consulta");
            return res.status(200).json(dataObj);
        }
        else
            return res.status(404).send("Breed/Name not found, please check your input search")
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}