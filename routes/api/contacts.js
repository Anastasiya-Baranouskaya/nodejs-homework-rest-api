const express = require("express");
const contactModel = require("../../models/contact");
const router = express.Router();
const {
  schemaCreateContact,
  schemaUpdateContact,
} = require("./contacts-validation");
const { validate } = require("../../middlewares/validation");

router.get("/", async (req, res, next) => {
  const contacts = await contactModel.listContacts();
  res.json({ status: "success", code: 200, payload: { contacts } });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await contactModel.getContactById(req.params.contactId);
  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }

  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not found" });
});

router.post("/", validate(schemaCreateContact), async (req, res, next) => {
  const contact = await contactModel.addContact(req.body);

  res.status(201).json({ status: "success", code: 201, payload: { contact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await contactModel.removeContact(req.params.contactId);
  if (contact) {
    return res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not found" });
});

router.put(
  "/:contactId",
  validate(schemaUpdateContact),
  async (req, res, next) => {
    const contact = await contactModel.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        payload: { contact },
      });
    }
    return res
      .status(404)
      .json({ status: "error", code: 404, message: "Not found" });
  }
);

module.exports = router;
