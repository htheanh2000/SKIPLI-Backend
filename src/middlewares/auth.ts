import { Request, NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';

interface RequestWithUser extends Request {
    user?: any;
  }
  
function validateToken(req:RequestWithUser, res:Response, next: NextFunction) {
  // Get the JWT from the request header
  const token = req.header('Authorization');
  // If there is no token, return an error
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the JWT using the secret key
    const decoded = jwt.verify(token, 'secret_key');
    // Add the decoded user information to the request object
    req.user = decoded;
    next();

  } catch (error) {
    // If the verification fails, return an error
    return res.status(400).json({ message: 'Invalid token.' });
  }
}

module.exports = validateToken;