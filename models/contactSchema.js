const Joi = require("joi");
const { Schema, model } = require("mongoose");
const contacts = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});
const updateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});
const schemas = {
  contactsSchema,
  updateFavorite,
};

const Contact = model("contact", contacts);

module.exports = {
  Contact,
  schemas,
};
