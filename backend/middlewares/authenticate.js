const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente
dotenv.config();

// Função de middleware para autenticação
module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Acesso negado' });
  }
  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(400).json({ error: 'Token mal formado' });
  }
  const jwtToken = tokenParts[1];
  try {
    const verified = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) 
  {
    res.status(400).json({ error: 'Token inválido' });
  }
};