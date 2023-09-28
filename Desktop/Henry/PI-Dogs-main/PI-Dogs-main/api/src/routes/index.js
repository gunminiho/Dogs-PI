const { Router } = require('express');
const getAllDogs = require("../controllers/getAllDogs");
const getDogByRace = require("../controllers/getDogbyRace");
const searchDogs = require("../controllers/searchDogs");
const getTemperamentList = require("../controllers/getTemperaments");
const postDog = require("../controllers/postDog");
const deleteDog = require("../controllers/deleteDog");
const updateDog = require("../controllers/updateDog");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Obtiene la lista de 264 perros
router.get("/dogs", (req, res) => {
    getAllDogs(req, res);
});
/* SI PONES PRIMERO LA RUTA /:idRaza antes de dogs/name, nunca llegara a interpretarse el dogs/name
ya que el orden en que los pones es importante ya que express evalua caso por caso el orden
en cual pones las rutas y al ser muy parecidos, hace que /name lo tome como un params
en vez de un query, esto se soluciona poniendo antes o cambiando la ruta para que no
sea similar o igual a la otra.
*/
router.get('/dogs/name', (req, res) => {
    searchDogs(req, res);
});
// Obtiene los perros por id
router.get('/dogs/:idRaza/:origin', (req, res) => {
    //searchDogs(req,res);
    getDogByRace(req, res);
});
router.get("/temperaments", (req, res) => {
    getTemperamentList(req, res);
});
router.post("/dogs", (req, res) => {
    postDog(req, res);
});
router.delete("/dog/delete/:id",(req,res)=>{
    
    deleteDog(req,res);
});

router.put("/dog/update", (req,res)=>{
    console.log("ROUTE");
    updateDog(req,res);
});

module.exports = router;
