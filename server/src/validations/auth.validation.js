import Joi from 'joi';

export const loginValidation = Joi.object({
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).required(),
});
