import Joi from 'joi';

export const post_productSchema = Joi.object({
  image: Joi.string().uri().trim().required()
    .messages({
      'string.uri': 'The image field must be a valid URL',
      'any.required': 'The image field is required',
      '*': 'Check the image field',
    }),
  name: Joi.string().trim().min(3).max(30)
    .required()
    .messages({
      'string.min': 'The name field must be at least 3 characters',
      'string.max': 'The name field must have at most 30 characters',
      'any.required': 'The name field is required',
      '*': 'Check the name field',
    }),
  cost: Joi.number().required().messages({
    'any.required': 'The cost field is required',
    '*': 'Check the const field',
  }),
  ingredients: Joi.string().trim().min(3).max(3000)
    .required()
    .messages({
      'string.min': 'The ingredients field must be at least 3 characters',
      'string.max': 'The ingredients field must be at most 3000 characters',
      'any.required': 'El campo ingredients es requerido',
      '*': 'Check the ingredients field',
    }),
    isAvailable: Joi.boolean().optional().messages({
      '*': 'Check the isAvailable field',
    }),
});

export const put_productSchema = Joi.object({
  image: Joi.string().uri().trim().messages({
    'string.uri': 'The image field must be a valid URL',
    '*': 'Check the image field',
  }),
  name: Joi.string().trim().min(3).max(30)
    .messages({
      'string.min': 'The name field must be at least 3 characters',
      'string.max': 'The name field must have at most 30 characters',
      '*': 'Check the name field',
    }),
  cost: Joi.number().messages({
    '*': 'Check the const field',
  }),
  ingredients: Joi.string().trim().min(3).max(3000)
    .messages({
      'string.min': 'The ingredients field must be at least 3 characters',
      'string.max': 'The ingredients field must be at most 3000 characters',
      '*': 'Check the ingredients field',
    }),
    isAvailable: Joi.boolean().optional().messages({
      '*': 'Check the isAvailable field',
    }),
}).custom((value, helper) => {
  const {
    image, name, cost, ingredients,
  } = value;

  if (!image && !name && !cost && !ingredients) {
    return helper.message('At least one field must be present in the body');
  }

  return true;
});
