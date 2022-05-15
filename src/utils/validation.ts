import Joi from 'joi';

export const usernameRule = Joi.string().min(3).max(30).required();

export const phoneNumberRule = Joi.string().pattern(/^1[0-9]{10}$/).required();

export const phoneCodeRule = Joi.string().length(6).required();

export const emailRule = Joi.string().email({ tlds: { allow: false  } }).required();

export const availableOnRule = Joi.string().isoDate().optional();

export const tellMeAboutYouRule = Joi.any().allow('a', 'b', 'c').optional();

export const contactUsValidation = Joi.object({
  name: usernameRule.required(),
  phone: phoneNumberRule.required(),
  phoneCode: phoneCodeRule.required(),
  email: emailRule.required(),
  availableOn: availableOnRule.optional(),
  tellMeAboutYou: tellMeAboutYouRule.optional()
});
