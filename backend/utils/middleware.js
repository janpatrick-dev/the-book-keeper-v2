const jwt = require('jsonwebtoken');

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '');
  }
  next();
};

const userExtractor = (request, response, next) => {
  const SECRET_KEY = process.env.PROD_TOKEN_SECRET;

  const decodedToken = jwt.verify(request.token, SECRET_KEY);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Invalid token' });
  }
  request.user = decodedToken;
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: error.message });
  } else if (error.message.includes('User validation failed')) {
    const errors = {};
    if (error.message.includes('email')) {
      errors.email = error.errors.email.properties.message
    }
    if (error.message.includes('password')) {
      errors.password = error.errors.password.properties.message;
    }
    return response.status(400).json({ error: errors });
  } else if (error.code === 11000) {
    const errors = {};
    
    if ("email" in error.keyValue) {
      errors.email = 'Email already exists.';
    }

    return response.status(400).json({ error: errors });
  }

  next(error);
};

module.exports = {
  tokenExtractor,
  userExtractor,
  errorHandler
}