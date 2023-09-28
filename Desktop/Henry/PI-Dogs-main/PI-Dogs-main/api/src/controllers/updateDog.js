const axios = require("axios");
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");

module.exports = async (req, res) => {
    const { id, name, height, weight, lifespan, image, temperament } = req.body;
    console.log(req.body);
    if (id) {
        try {
            const dog = await Dog.findByPk(id);
            if (dog)
                await dog.update({
                    name,
                    height,
                    weight,
                    lifespan,
                    image
                });
            if (temperament && temperament.length > 0) {
                const temp = await Temperament.findAll(
                    {
                        where: {
                            name: { [Op.in]: temperament } // le pasas todo los temperamentos selecionados como un array de strings
                        }
                    }
                )
                const sucess = await dog.setTemperaments(temp)
                return res.status(200).send(dog);
            }
        } catch (error) {
            console.log(error);
            return res.status(404).send(error.message);
        }
    }



}