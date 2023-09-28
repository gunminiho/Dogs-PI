const axios = require("axios");
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");

module.exports = async (req, res) => {
  const { id,name, height, weight, lifespan, image, temperament } = req.body;
  //console.log("BODY",req.body);
  if (temperament && name && height && weight && lifespan && image)
    try {
      const newDog = await Dog.create({
        // crea un nuevo perro en DB
        id,
        name,
        image,
        height,
        weight,
        lifespan,
      });
      if (newDog) {
        const temperamentsDB = await Temperament.findAll({
          // busca los temperamentos en DB y obtiene los ids
          where: {
            name: { [Op.in]: temperament }, // le pasas todo los temperamentos selecionados como un array de strings
          },
        });
        newDog.setTemperaments(temperamentsDB); // establece la relacion entre el perro creado y los temperamentos en la tabla relacional
        return res.status(200).json(newDog);
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({error});
     
    }
  else
    return res
      .status(404)
      .send("Must have at least 1 temperament or Information for this dog");
};
