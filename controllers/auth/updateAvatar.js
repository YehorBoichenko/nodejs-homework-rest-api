const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { path: tempDir, originalname } = req.file;
    const { _id } = req.user;
    const image = await jimp.read(tempDir);
    image.resize(250, 250).writeAsync(tempDir);

    const extention = originalname.split(".").pop();
    const newName = `${_id}.${extention}`;
    const resultDir = path.join(avatarsDir, newName);
    await fs.rename(tempDir, resultDir);
    const avatarURL = path.join("avatars", newName);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
