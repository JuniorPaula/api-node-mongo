/** criar o model de usuário */
/** importa o mongoose */
const mongoose = require('mongoose');

const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
});

/** exportar o model */
module.exports = User;
