const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
const ctrl = require("../../controllers/auth");
const { validation, isAuthorized } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post("/signup", validation(schemas.signup), ctrlWrapper(ctrl.signup));

router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));

router.get("/current", isAuthorized, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", isAuthorized, ctrlWrapper(ctrl.logout));

module.exports = router;