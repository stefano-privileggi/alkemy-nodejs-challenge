import _ from "lodash";
import jwt from "jsonwebtoken";
import Joi from 'joi';

import User from "../models/User.js";

import { comparePasswords, hashPassword } from '../lib/crypting.js';
import Mail from "../lib/mails.js";

export const login = async (request, response) => {
  
  const schema = {
    email: Joi.string().email(),
    password: Joi.string()
  };

  const result = Joi.validate(request.body, schema);
  if (result.error)
    return response.status(400).json(result.error.details[0].message);
        
  let user = await User.findOne({
    where: {
      email: request.body.email
    }
  });

  if (user == null)
    return response.status(400).json('Invalid email or password.')

  const enteredPassword = request.body.password;
  const password = user.dataValues.password;

  const validPassword = await comparePasswords(enteredPassword, password);
  if (!validPassword)
    return response.status(400).json('Invalid email or password.')

  response.json('Login successfully!')

}

export const register = async (request, response) => {
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().email(),
    password: Joi.string()
  };
  const result = Joi.validate(request.body, schema);
  if (result.error)
    return response.status(400).json(result.error.details[0].message);

  let user = await User.findOne({ where: { email: request.body.email }});
  if (user != undefined)
    return response.status(400).json('Invalid email or password.');

  user = _.pick(request.body, ['name', 'email', 'password']);

  // Encripta la contraseña para guardarla en la bd.
  user.password = await hashPassword(user.password);

  user = await User.create({
    name: user.name,
    email: user.email,
    password: user.password
  });

  const token = jwt.sign({ id: user.dataValues.id }, process.env.JWT_PRIVATE_KEY);
  
  //Enviar mail de bienvenida
  const sgMail = new Mail(
    'stefano.privileggi@gmail.com',
    'Welcome message',
    `Thank you for registering ${user.name}`
  );
  sgMail.sendMail();
  
  response
    .header('x-auth-token', token)
    .json(_.pick(user, ['id', 'name', 'email'])); //** Password not returned.
}


