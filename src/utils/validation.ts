import Joi from 'joi';

export const usernameRule = Joi.string().alphanum().min(3).max(30);

export const phoneNumberRule = Joi.string().pattern(/^1[0-9]{10}$/);

export const phoneCodeRule = Joi.string().length(6);

export const emailRule = Joi.string().email({ tlds: { allow: false  } });

export const availableOnRule = Joi.string().isoDate();

export const tellMeAboutYouRule = Joi.any().allow('a', 'b', 'c');
