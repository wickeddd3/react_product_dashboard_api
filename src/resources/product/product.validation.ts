import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().default('').empty(''),
  code: Joi.string().default('').empty(''),
  sku: Joi.string().default('').empty(''),
  quantity: Joi.string().default(0).empty(''),
  category: Joi.string().default('').empty(''),
  tags: Joi.array().min(0).default([]).empty(''),
  regularPrice: Joi.string().default(0).empty(''),
  salePrice: Joi.string().default(0).empty(''),
  image: Joi.string().default('').empty(''),
  createdBy: Joi.string().default('').empty(''),
  updatedBy: Joi.string().default('').empty(''),
});

const update = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().default('').empty(''),
  code: Joi.string().default('').empty(''),
  sku: Joi.string().default('').empty(''),
  quantity: Joi.string().default(0).empty(''),
  category: Joi.string().default('').empty(''),
  tags: Joi.array().min(0).default([]).empty(''),
  regularPrice: Joi.string().default(0).empty(''),
  salePrice: Joi.string().default(0).empty(''),
  image: Joi.string().default('').empty(''),
  createdBy: Joi.string().default('').empty(''),
  updatedBy: Joi.string().default('').empty(''),
});

export default { create, update };
