import Joi from 'joi';

export const post_orderSchema = Joi.object({
        productsOrdered: Joi.array().items(Joi.object({
          name: Joi.string().trim().min(3).max(30)
          .required()
          .messages({
                'string.min': 'The "name" field must have at least 3 characters.',
                'string.max': 'The "name" field must not exceed 30 characters.',
                'any.required': 'The "name" field is required.',
                '*': 'Check the "name" field.',
              }),
          image: Joi.string().uri().trim().required()
          .messages({
                'string.uri': 'The "image" field must be a valid url.',
                'any.required': 'The "image" field is required.',
                '*': 'Check the "image" field.',
              }),
          cost: Joi.number().required().messages({
                'any.required': 'The "cost" field is required.',
                '*': 'Check the "cost" field.',
              }),
          ingredients: Joi.string().trim().min(3).max(100)
          .required()
          .messages({
                'string.min': 'The "ingredients" field must have at least 3 characters.',
                'string.max': 'The "ingredients" field must have at least 3000 characters.',
                'any.required': 'The "ingredients" field is required.',
                '*': 'Check the "ingredients" field.',
              }),
          quantity: Joi.number().required().messages({
                'any.required': 'The "quantity" field is required.',
                '*': 'Check the "quantity" field.',
              }),
          isAvailable: Joi.boolean(),
        })).required(),
        userId: Joi.string().required().messages({
            'any.required': 'The "userId" field is required.',
            '*': 'Check the "description" field.',
          }),
        isActive: Joi.boolean(),
      });