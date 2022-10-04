const express = require("express");
const ctrl = require("../../controllers/contacts/index");
const { ctrlWrapper } = require("../../helpers/index");
const {
  validation,
  isValidID,
  isAuthorized,
} = require("../../middlewares/index");
const { schemas } = require("../../models/contactSchema");
const router = express.Router();

router.get("/", isAuthorized, ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidID, ctrlWrapper(ctrl.getByID));

router.post("/", isAuthorized, validation(schemas.add), ctrlWrapper(ctrl.add));

router.put(
  "/:id",
  isValidID,
  validation(schemas.add),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  isValidID,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", ctrlWrapper(ctrl.removeById));
module.exports = router;
// router.get("/", async (req, res, next) => {
//   try {
//     const result = await Contact.find();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await Contact.findOne({ _id: contactId });
//     if (result === null) {
//       throw RequestError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = contactsSchema.validate(req.body);
//     const result = await Contact.create(req.body);
//     if (error) {
//       throw RequestError(400, "Missing required name field");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.delete("/:contactId", async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await Contact.findByIdAndRemove(contactId);
//     if (result === null) {
//       throw RequestError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });
// router.put("/:contactId", async (req, res, next) => {
//   try {
//     const { error } = contactsSchema.validate(req.body);
//     const { contactId } = req.params;
//     const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//       new: true,
//     });
//     if (error) {
//       throw RequestError(400, "missing fields");
//     }

//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.patch("/:contactId/favorite", async (req, res, next) => {
//   try {
//     const { error } = Schema.validate(req.body);
//     const { contactId } = req.params;
//     const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//       new: true,
//     });
//     if (error) {
//       throw RequestError(400, "missing field Favorite");
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });
