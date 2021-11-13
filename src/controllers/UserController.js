/** expotar as funções do userController */
const validator = require('validator');
const bcrypt = require('bcryptjs');

/** importar o model de usuario */
const User = require('../models/User');

/** método responsável por listar todos os usuários */
exports.index = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: `Erro ao receber os dados ${err}` });
  }
};

/** método responsável por listar um usuário */
exports.show = async (req, res) => {
  /** extrair o id da requisição = req.parms.id */
  const { id } = req.params;

  /** encontrar o usuário pelo id */
  try {
    const user = await User.findById(id, '-password');

    /** verificar se o usuário existe */
    if (!user) {
      return res.status(422).json({ message: 'Usuário não encontrado!' });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: `erro ao tentar exibir os dados ${err}` });
  }
};

/** método responsável por cadastrar um usuário */
exports.create = async (req, res) => {
  /** recuperar os dados do body */
  const {
    name, email, password, confirmPassword,
  } = req.body;

  /** validar os dados */
  if (!name) {
    return res.status(422).json({ message: 'Nome é obrigatório!' });
  }
  if (!validator.isEmail(email)) {
    return res.status(422).json({ message: 'Email inválido!' });
  }
  if (password.length < 3 || password.length > 50) {
    return res.status(422).json({ message: 'Senha precisa ter acima de 3 caracteres!' });
  }

  if (password !== confirmPassword) {
    return res.status(422).json({ message: 'Senha precisam ser iguais!' });
  }

  /** check if user exist */
  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(422).json({ message: 'Email já cadastrado!' });
  }

  /** create password hash */
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  /** criar um objeto com os dados do body */
  const user = {
    name,
    email,
    password: hashPassword,
  };

  /** criar os dados no banco */
  try {
    await User.create(user);
    return res.status(201).json({ message: 'Usuário criado com succeso!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'erro ao cadrastrar o usuário.' });
  }
};

/** método responsável por atualizar um usuário */
exports.update = async (req, res) => {
  /** recuperar os dados do usuário */
  const { id } = req.params;
  const { name, age, ocupation } = req.body;

  const newUser = {
    name, age, ocupation,
  };

  try {
    const updatedUser = await User.updateOne({ _id: id }, newUser);

    /** verificar se não houver atualização */
    if (updatedUser.matchedCount === 0) {
      return res.status(422).json({ message: 'Usuário não encontrado!' });
    }

    return res.status(200).json(newUser);
  } catch (err) {
    return res.status(500).json({ mensage: 'Erro ao atualizar os dados.' });
  }
};

/** método responsável por deletar um usuário */
exports.delete = async (req, res) => {
  /** recuperar os dados do usuário */
  const { id } = req.params;

  const user = await User.findOne({ _id: id });

  /** verificar se o usuário existe */
  if (!user) {
    return res.status(422).json({ message: 'Usuário não encontrado!' });
  }

  try {
    await User.deleteOne({ _id: id });

    return res.status(200).json({ mensage: 'Usuário removido com sucesso!' });
  } catch (err) {
    return res.status(500).json({ mensage: 'Erro ao deletar os dados.' });
  }
};
