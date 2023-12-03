import Joi from 'joi';

export const post_userSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(25).required().messages({
    'string.min': 'El campo firstname debe tener al menos 3 caracteres',
    'string.max': 'El campo firstname debe tener, como mucho, 25 caracteres',
    'any.required': 'El campo firstname es requerido',
    '*': 'Revisa el campo firstname',
  }),
  lastname: Joi.string().trim().min(3).max(25).required().messages({
    'string.min': 'El campo lastname debe tener al menos 3 caracteres',
    'string.max': 'El campo lastname debe tener, como mucho, 25 caracteres',
    'any.required': 'El campo lastname es requerido',
    '*': 'Revisa el campo lastname',
  }),
  username: Joi.string().trim().min(3).max(25).required().messages({
    'string.min': 'El campo username debe tener al menos 3 caracteres',
    'string.max': 'El campo username debe tener, como mucho, 25 caracteres',
    'any.required': 'El campo username es requerido',
    '*': 'Revisa el campo username',
  }),
  email: Joi.string().trim().min(3).max(25).required().messages({
    'string.min': 'El campo email debe tener al menos 3 caracteres',
    'string.max': 'El campo email debe tener, como mucho, 25 caracteres',
    'any.required': 'El campo email es requerido',
    '*': 'Revisa el campo email',
  }),
  password: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)
    .messages({
      'string.min': 'El campo password debe tener al menos 6 caracteres',
      'string.max': 'El campo password debe tener, como mucho, 15 caracteres',
      'any.required': 'El campo password es requerido',
      'string.pattern.base':
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula y tener una longitud entre 8 y 15 caracteres.',
      '*': 'Revisa el campo password',
    }),
});

export const put_userSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(25).messages({
    'string.min': 'El campo firstname debe tener al menos 3 caracteres',
    'string.max': 'El campo firstname debe tener, como mucho, 25 caracteres',
    '*': 'Revisa el campo firstname',
  }),
  lastname: Joi.string().trim().min(3).max(25).messages({
    'string.min': 'El campo lastname debe tener al menos 3 caracteres',
    'string.max': 'El campo lastname debe tener, como mucho, 25 caracteres',
    '*': 'Revisa el campo lastname',
  }),
  username: Joi.string().trim().min(3).max(25).messages({
    'string.min': 'El campo username debe tener al menos 3 caracteres',
    'string.max': 'El campo username debe tener, como mucho, 25 caracteres',
    '*': 'Revisa el campo username',
  }),
  email: Joi.string().trim().min(3).max(25).messages({
    'string.min': 'El campo email debe tener al menos 3 caracteres',
    'string.max': 'El campo email debe tener, como mucho, 25 caracteres',
    '*': 'Revisa el campo email',
  }),
  password: Joi.string()
    .trim()
    .min(3)
    .max(15)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z]).{8,15}$/,
    )
    .messages({
      'string.min': 'El campo password debe tener al menos 6 caracteres',
      'string.max': 'El campo password debe tener, como mucho, 15 caracteres',
      'string.pattern.base':
        'El campo "password" debe tener al menos un numero, una letra y un caracter especial',
      '*': 'Revisa el campo password',
    }),
}).custom((value, helper) => {
  const { firstname, lastname, username, email, password } = value;

  if (!firstname && !lastname && !username && !email && !password) {
    return helper.message('Al menos un campo debe estar presente en el body');
  }

  return true;
});
