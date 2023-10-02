import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().default('').empty(''),
  organization: Joi.string().default('').empty(''),
  type: Joi.string().default('').empty(''),
  members: Joi.array().min(0).default([]).empty(''),
  prefixId: Joi.string().default('').empty(''),
  createdBy: Joi.string().default('').empty(''),
  updatedBy: Joi.string().default('').empty(''),
});

const update = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().default('').empty(''),
  organization: Joi.string().default('').empty(''),
  type: Joi.string().default('').empty(''),
  members: Joi.array().min(0).default([]).empty(''),
  prefixId: Joi.string().default('').empty(''),
  createdBy: Joi.string().default('').empty(''),
  updatedBy: Joi.string().default('').empty(''),
});

export default { create, update };
