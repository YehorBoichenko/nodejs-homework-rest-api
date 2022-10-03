const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers/RequestError");

const isValidID = (req, _, next) => {
  if (!isValidObjectId(req.params.id)) {
    next(RequestError(404, "Not found"));
  }
  next();
};

module.exports = isValidID;
