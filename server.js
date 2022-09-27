const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const { MONGOOSE_URL } = process.env;

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
mongoose
  .connect(MONGOOSE_URL)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log("Database Connection Error!");
    console.log(error);
    process.exit(1);
  });
