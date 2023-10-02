import Joi from 'joi';

const register = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  organization: Joi.string().required(),
});

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const profile = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
});

const password = Joi.object({
  password: Joi.string().min(6).required(),
});

export default {
  register,
  login,
  profile,
  password,
};
