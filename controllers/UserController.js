/** expotar as funções do userController */

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
    const user = await User.findOne({ _id: id });

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
  const { name, age, ocupation } = req.body;

  /** validar os dados */
  if (!name) {
    return res.status(422).json({ message: 'Nome é obrigatório!' });
  }
  if (!age) {
    return res.status(422).json({ message: 'Idade é obrigatório!' });
  }
  if (!ocupation) {
    return res.status(422).json({ message: 'Profissão é obrigatório!' });
  }

  /** criar um objeto com os dados do body */
  const user = {
    name,
    age,
    ocupation,
  };

  /** criar os dados no banco */
  try {
    await User.create(user);
    return res.status(201).json({ message: 'Usuário criado com succeso!' });
  } catch (err) {
    return res.status(500).json({ message: `erro ao cadrastrar o usuário${err}` });
  }
};
