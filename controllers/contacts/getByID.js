const { RequestError } = require("../../helpers");
const { Contact } = require("../../models/contactSchema");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = getById;