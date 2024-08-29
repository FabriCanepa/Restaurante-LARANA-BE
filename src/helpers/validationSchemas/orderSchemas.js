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
          price: Joi.number().required().messages({
                'any.required': 'The "price" field is required.',
                '*': 'Check the "price" field.',
              }),
          description: Joi.string().trim().min(3).max(100)
          .required()
          .messages({
                'string.min': 'The "description" field must have at least 3 characters.',
                'string.max': 'The "description" field must have at least 3 characters.',
                'any.required': 'The "description" field is required.',
                '*': 'Check the "description" field.',
              }),
          amount: Joi.number().required().messages({
                'any.required': 'The "amount" field is required.',
                '*': 'Check the "amount" field.',
              }),
          isAvailable: Joi.boolean(),
        })).required(),
        tablenumber: Joi.number(),
        userId: Joi.string().required().messages({
            'any.required': 'The "userId" field is required.',
            '*': 'Check the "description" field.',
          }),
        isActive: Joi.boolean(),
      });