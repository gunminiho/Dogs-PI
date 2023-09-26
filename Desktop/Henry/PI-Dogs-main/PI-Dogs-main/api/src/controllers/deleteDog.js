const axios = require("axios");
require("dotenv").config();
const { Dog, Temperament } = require("../db");


module.exports = async (req, res) => {

    const { id } = req.params;

    try {
        if (id) {
            const result = await Dog.destroy({
                where: {
                    id: Number(id)
                }
            });
            if (result == 1)
                return res.status(200).send(`¡${result} dog was deleted sucessfully!`);
            else
                return res.status(500).send(`¡care! ${result} records were found and deleted, please check it out`);
        } else {
            return res.status(404).send("missing ID please check params");
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }

}