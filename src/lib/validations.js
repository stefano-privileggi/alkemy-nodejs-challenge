import Joi from 'joi';

export const validateCharacter = (body) => {

  const schema = {
    image: Joi.string().required(),
    name: Joi.string().required(),
    age: Joi.number().integer().min(0).required(),
    weight: Joi.number().integer().min(0).required(),
    history: Joi.string().min(5).required()
  };

  return Joi.validate(body, schema);
}

export const validateMovie = (body) => {

  const schema = {
    image: Joi.string().required(),
    title: Joi.string().required(),
    calification: Joi.number().integer().min(1).max(5)
  }

  return Joi.validate(body, schema);
}