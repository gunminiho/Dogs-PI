//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const axios = require("axios");
const { conn, Temperament } = require('./src/db.js');
const endPointForTemperaments = "http://localhost:3001/temperaments";

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  server.listen(3001, async () => {
    // actualizando Temperamentos al iniciar server
    try {
      const { data: { temperaments } } = await axios.get(endPointForTemperaments); // llamando al endpoint get/temperaments
      // ordenando alfabeticamente y dandole forma de objeto con la misma estructura que la tabla
      const temperamentList = temperaments.sort().map(name => ({ name }));
      await Temperament.bulkCreate(temperamentList); // usando bulkCreate para hacer una sola consulta
      console.log('%s listening at 3001');
    } catch (error) {
      console.log(error.message);
    }
  });
});
