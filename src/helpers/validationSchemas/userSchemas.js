import Joi from 'joi';

export const post_userSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(25)
    .required()
    .messages({
      'string.min': 'The firstname field must be at least 3 characters',
      'string.max': 'The firstname field must be at most 25 characters',
      'any.required': 'The firstname field is required',
      '*': 'Check the firstname field',
    }),
  lastname: Joi.string().trim().min(3).max(25)
    .required()
    .messages({
      'string.min': 'The lastname field must be at least 3 characters',
      'string.max': 'The lastname field must be at most 25 characters',
      'any.required': 'The lastname field is required',
      '*': 'Check the lastname field',
    }),
  email: Joi.string().trim().min(3).max(25)
    .required()
    .messages({
      'string.min': 'The email field must be at least 3 characters',
      'string.max': 'The email field must have, at most, 25 characters',
      'any.required': 'The email field is required',
      '*': 'Check the email field',
    }),
  password: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)
    .messages({
      'string.min': 'The password field must have at least 6 characters',
      'string.max': 'The password field must be at most 15 characters',
      'any.required': 'The password field is required',
      'string.pattern.base':
        'The password must contain at least one lowercase letter, one uppercase letter, and be between 8 and 15 characters long.',
      '*': 'Check the password field',
    }),
});

export const put_userSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(25)
    .messages({
      'string.min': 'The firstname field must be at least 3 characters',
      'string.max': 'The firstname field must be at most 25 characters',
      '*': 'Check the firstname field',
    }),
  lastname: Joi.string().trim().min(3).max(25)
    .messages({
      'string.min': 'The lastname field must be at least 3 characters',
      'string.max': 'The lastname field must be at most 25 characters',
      '*': 'Revisa el campo lastname',
    }),
  username: Joi.string().trim().min(3).max(25)
    .messages({
      'string.min': 'The username field must be at least 3 characters',
      'string.max': 'The username field must have, at most, 25 characters',
      '*': 'Check the username field',
    }),
  email: Joi.string().trim().min(3).max(25)
    .messages({
      'string.min': 'The email field must be at least 3 characters',
      'string.max': 'The email field must have, at most, 25 characters',
      '*': 'Check the email field',
    }),
  password: Joi.string()
    .trim()
    .min(3)
    .max(15)
    .regex(/^(?=.*[a-z])(?=.*[A-Z]).{8,15}$/)
    .messages({
      'string.min': 'The password field must be at least 6 characters',
      'string.max': 'The password field must have, at most, 15 characters',
      'string.pattern.base':
        'The "password" field must have at least one number, one letter and one special character',
      '*': 'Revisa el campo password',
    }),
}).custom((value, helper) => {
  const {
    firstname, lastname, username, email, password,
  } = value;

  if (!firstname && !lastname && !username && !email && !password) {
    return helper.message('At least one field must be present in the body');
  }

  return true;
});
