import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().max(500).allow('', null),
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(100),
  description: Joi.string().max(500).allow('', null),
}).or('title', 'description');
