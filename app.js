const express = require("express");
const bodyParser= require("body-parser");
const cors = require("cors");

const app = express();

//configurar cors
app.use(cors());

//importar rutas
//...

//configurar body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//configurar static folder
app.use(express.static("uploads"));



//configurar rutas
//...


module.exports = app;