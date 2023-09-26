const axios = require("axios");
const URL = "https://api.thedogapi.com/v1/breeds/";
const {Dog, Temperament} = require("../db");

module.exports = async (req, res) => {
    let response=[];
    try {
        const { data } = await axios.get(URL);
        data.map(dog => {
            response.push({
               id: dog.id ,
               name : dog.name,
               height: dog.height.metric,
               weight: dog.weight.metric,
               lifespan: dog.life_span,
               image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
               temperament: dog.temperament,
               origin:"api"
            });
        });
        const dataDB = await Dog.findAll({
            include: [
              {
                model: Temperament,
                attributes: ['name'], // Puedes especificar las columnas que deseas seleccionar
                through: { attributes: [] }, // Excluye las columnas de la tabla intermedia si no las necesitas
              },
            ],
          });
        dataDB.map((dog,key) => {
            response.push({
               id: dog.id ,
               name : dog.name,
               height: dog.height,
               weight: dog.weight,
               lifespan: dog.lifespan,
               image: dog.image,
               temperament: dog.temperaments.map(temp => temp.dataValues.name).join(", "),
               origin:"db"
            }) 
           //console.log(response[key].temperament);
        });
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
}