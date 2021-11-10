/** iniciar as rotas */
const express = require('express');

/** importar o Router */
const route = express.Router();

/** importar os controllers */
const UserController = require('./controllers/UserController');

/** rotas usuários */
route.get('/user', UserController.index);
route.post('/user', UserController.create);

/** exportar as rotas */
module.exports = route;
