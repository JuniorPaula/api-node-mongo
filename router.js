/** iniciar as rotas */
const express = require('express');

/** importar o Router */
const route = express.Router();

/** importar os controllers */
const UserController = require('./controllers/UserController');

/** rotas usuários */
route.get('/user', UserController.index);
route.post('/user', UserController.create);
route.get('/user/:id', UserController.show);
route.put('/user/:id', UserController.update);
route.delete('/user/:id', UserController.delete);

/** exportar as rotas */
module.exports = route;
