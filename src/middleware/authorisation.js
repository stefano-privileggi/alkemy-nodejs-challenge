import jwt from "jsonwebtoken";

export const authorization = (request, response, next) => {
  const token = request.header('x-auth-token');
  if (!token) 
    return response.status(401).json('Access denied. No token provided.')
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    request.user = decoded ;
    next();
  } catch (error) {
    return response.status(400).send('Invalid token.')
  }
}

