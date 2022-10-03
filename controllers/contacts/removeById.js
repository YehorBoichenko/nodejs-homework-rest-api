const { RequestError } = require("../../helpers");
const { Contact } = require("../../models/contactSchema");

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove({ _id: id });
  if (!result) {
    throw RequestError(404);
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = removeById;
