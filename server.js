require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

/** importar as rotas */
const routes = require('./router');

/** configurar o express para ler JSON */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** fazer o express usar as rotas */
app.use(routes);

const port = process.env.PORT;

mongoose.connect(process.env.URL_CONNECT)
  .then(() => {
    console.log('conectado ao mongodb');
    app.listen(port, () => {
      console.log(`Servidor executando na porta: ${port}`);
      console.log(`CTRL + click http://localhost: ${port}`);
    });
  })
  .catch((err) => { console.log(err); });
