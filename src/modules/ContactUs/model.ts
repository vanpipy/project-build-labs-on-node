import Joi from 'joi';
import {availableOnRule, emailRule, phoneCodeRule, phoneNumberRule, tellMeAboutYouRule, usernameRule} from '../../utils/validation';

export const contactUsValication = Joi.object({
  name: usernameRule.required(),
  phone: phoneNumberRule.required(),
  phone_code: phoneCodeRule.required(),
  email: emailRule.required(),
  available_on: availableOnRule.optional(),
  tell_me_about_you: tellMeAboutYouRule.optional()
});

