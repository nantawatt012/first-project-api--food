const Joi = require("joi");
const validate = require("./validate");

const createItemSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Product name is required"
  }),
  price: Joi.string()
    // .pattern(/^[0-9]$/)
    .required()
    .messages({
      "string.empty": "Product price is required"
    }),
  description: Joi.optional(),
  type: Joi.string(),
  itemLeft: Joi.string().empty("").default(0)
});
exports.validateCreateItem = validate(createItemSchema);
