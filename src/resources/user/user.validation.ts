import Joi from 'joi';

const user = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
  organization: Joi.string().default('').empty(''),
  avatar: Joi.string().default('').empty(''),
});

const create = user;

const update = user;

export default { create, update };
