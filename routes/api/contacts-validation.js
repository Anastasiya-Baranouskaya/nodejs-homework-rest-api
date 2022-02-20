/* eslint-disable prefer-regex-literals */
const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "missing required name field ",
    "string.empty": "missing fields",
  }),

  phone: Joi.string().pattern(new RegExp("[0-9]+")).required().messages({
    "any.required": "missing required phone field ",
    "string.empty": "missing fields",
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ru"] },
    })
    .messages({
      "any.required": "missing required email field ",
      "string.empty": "missing fields",
    }),
});
const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "missing required name field",
  }),

  phone: Joi.string().pattern(new RegExp("[0-9]+")).required().messages({
    "string.empty": "missing fields",
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ru"] },
    })
    .messages({
      "any.required": "missing required email field ",
      "string.empty": "missing fields",
    }),
});
module.exports = { schemaCreateContact, schemaUpdateContact };
