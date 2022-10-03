const { RequestError } = require("../../helpers");
const { Contact } = require("../../models/contactSchema");

const updateFavorite = async (req, res, next) => {
  const body = req.body;
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, body, { new: true });
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = updateFavorite;
