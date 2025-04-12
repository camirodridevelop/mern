require("dotenv");
const express = require("express");
const bodyParser= require("body-parser");
const cors = require("cors");
const apiVersion = process.env.API_VERSION;

const app = express();

//configurar cors
app.use(cors());

//importar rutas
const authRoutes = require('./router/auth');
const userRoutes = require("./router/user");
const movieRoutes = require("./router/movie");

//configurar body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//configurar static folder
app.use(express.static("uploads"));




//configurar rutas
//app.use(`/api/${apiVersion}`, authRoutes);
//app.use(`/api/${apiVersion}`, userRoutes);
//app.use(`/api/${apiVersion}`, movieRoutes);

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", movieRoutes);


module.exports = app;