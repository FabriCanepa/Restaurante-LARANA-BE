import Joi from 'joi';

export const post_productSchema = Joi.object({
  image: Joi.string().uri().trim().required()
    .messages({
      'string.uri': 'El campo image debe ser una URL válida',
      'any.required': 'El campo image es requerido',
      '*': 'Revisa el campo image',
    }),
  name: Joi.string().trim().min(4).max(30)
    .required()
    .messages({
      'string.min': 'El campo name debe tener al menos 4 caracteres',
      'string.max': 'El campo name debe tener, como mucho, 30 caracteres',
      'any.required': 'El campo name es requerido',
      '*': 'Revisa el campo name',
    }),
  cost: Joi.number().required().messages({
    'any.required': 'El campo cost es requerido',
    '*': 'Revisa el campo const',
  }),
  ingredients: Joi.string().trim().min(5).max(500)
    .required()
    .messages({
      'string.min': 'El campo ingredients debe tener al menos 5 caracteres',
      'string.max': 'El campo ingredients debe tener, como mucho, 500 caracteres',
      'any.required': 'El campo ingredients es requerido',
      '*': 'Revisa el campo ingredients',
    }),
    isAvailable: Joi.boolean().optional().messages({
      '*': 'Revisa el campo isAvailable',
    }),
});

export const put_productSchema = Joi.object({
  image: Joi.string().uri().trim().messages({
    'string.uri': 'El campo image debe ser una URL válida',
    '*': 'Revisa el campo image',
  }),
  name: Joi.string().trim().min(4).max(30)
    .messages({
      'string.min': 'El campo name debe tener al menos 4 caracteres',
      'string.max': 'El campo name debe tener, como mucho, 30 caracteres',
      '*': 'Revisa el campo name',
    }),
  cost: Joi.number().messages({
    '*': 'Revisa el campo const',
  }),
  ingredients: Joi.string().trim().min(5).max(500)
    .messages({
      'string.min': 'El campo ingredients debe tener al menos 5 caracteres',
      'string.max': 'El campo ingredients debe tener, como mucho, 500 caracteres',
      '*': 'Revisa el campo ingredients',
    }),
    isAvailable: Joi.boolean().optional().messages({
      '*': 'Revisa el campo isAvailable',
    }),
}).custom((value, helper) => {
  const {
    image, name, cost, ingredients,
  } = value;

  if (!image && !name && !cost && !ingredients) {
    return helper.message('Al menos un campo debe estar presente en el body');
  }

  return true;
});
