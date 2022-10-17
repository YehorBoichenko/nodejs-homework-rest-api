const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { User } = require("../../models/user");
const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  if (user) {
    throw RequestError(400, "missing required fields");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = createVerifyEmail(email, verificationToken);

  await sendEmail(mail);
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;
