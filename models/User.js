/** criar o model de usuário */
/** importa o mongoose */
const mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: String,
  age: Number,
  ocupation: String,
});

/** exportar o model */
module.exports = User;
