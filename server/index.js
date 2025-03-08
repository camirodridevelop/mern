//permite la conexion a nuestra bd en mongodb
const mongoose = require ("mongoose");

//config dotenv
require("dotenv").config();

//obtener variales de entorno .env
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;

console.log(dbUser);
console.log(dbPass);
console.log(dbHost);

//hacemos la conexion a nuestra base de datos...
const connectDB = async () => {
    try { 
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/`);
        console.log("La conexion con la base de datos ha sido exitosa");
    }  catch (error) {
        console.log("Error al conectar a la base de datos." ,error);
    }
};

connectDB();













