/** importar o model de usuario */
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  /** validar os dados */
  if (!validator.isEmail(email)) {
    return res.status(422).json({ message: 'Email inválido!' });
  }

  if (password.length < 3 || password.length > 50) {
    return res.status(422).json({ message: 'Senha precisa ter acima de 3 caracteres!' });
  }

  /** check if user exist */
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado!' });
  }

  /** check if password match */
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(422).json({ message: 'Senha inválida!' });
  }

  /** creck token */
  try {
    const secret = process.env.SECRET;
    const token = jwt.sign({ id: user._id }, secret);

    return res.status(200).json({ message: 'Login realizado com sucesso!', token });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ message: 'Erro ao conectar com o servidor!' });
  }
};
