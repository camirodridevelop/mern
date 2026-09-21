// config dotenv (debe cargarse primero para que las variables estén disponibles)
require("dotenv").config();

// permite la conexión a nuestra base de datos en MongoDB
const mongoose = require("mongoose");
const app = require("./app");

// variables de entorno (.env)
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const ipServer = process.env.IP_SERVER || "localhost";
const apiVersion = process.env.API_VERSION || "v1";

const port = process.env.PORT || 3977;

if (!process.env.JWT_SECRET) {
  console.warn("Advertencia: falta JWT_SECRET en el .env, el login no va a funcionar.");
}

// hacemos la conexión a nuestra base de datos...
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/`);
    app.listen(port, () => {
      console.log("=======================================");
      console.log("================API REST===============");
      console.log("=======================================");
      console.log(`http://${ipServer}:${port}/api/${apiVersion}/`);
    });
  } catch (error) {
    console.log("Error al conectar a la base de datos.", error);
  }
};

connectDB();
