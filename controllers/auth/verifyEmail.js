const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw RequestError(404);
    }
    await User.findByIdAndUpdate(user._id, {
      verificationToken: "",
      verify: true,
    });
    res.json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;
