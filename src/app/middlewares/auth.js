import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // pega uma função de callback e permite usar com asyn await
import authConfig from '../../config/auth';

// allows only logged users to update
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' '); // retorna um array com a palavra bearer e o token

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret); // decoda o token

    req.userId = decoded.id; // coloca o id autenticado no req

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
