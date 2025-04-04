const express = require('express');
const UserController = require('../controllers/user')

const api = express.Router();

//rutas

//para obtener utilizo get
api.get('/user/me', UserController.getMe);


module.exports = api;

//en el router se ejecutan los controladores
//se exporta a app