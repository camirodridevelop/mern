const express = require('express');
const UserController = require('../controllers/user')
const md_auth = require("../middlewares/authentacted")

const api = express.Router();

//rutas

//para obtener utilizo get
api.get('/user/me',[md_auth.mdAuth] ,UserController.getMe);
//cuando haga una peticion a get primero middlewARE va verificar si es valido
//si cumple recien se ejecuta usercontroller

module.exports = api;

//en el router se ejecutan los controladores
//se exporta a app
//md_auth como es un intermediario se ejecuta a mitad del proceso
//los middleware van con []