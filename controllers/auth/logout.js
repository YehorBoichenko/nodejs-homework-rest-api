const { User } = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.body;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = logout;
