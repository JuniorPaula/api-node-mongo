const jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth && auth.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado!' });
  }

  /** validar o token */
  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);

    next();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: 'Token inválido!' });
  }
};
