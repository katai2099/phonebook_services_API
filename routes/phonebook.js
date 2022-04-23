const express = require("express");
const router = express.Router();
const phonebookController = require("../controllers/phonebookController");
const { validation } = require("../middlewares");

/* GET phonebook */
router.get(
  "/getAllPhonebookRecord",
  phonebookController.getAllPhonebookRecords
);
router.get(
  "/getSubscriberName",
  validation.validatePhoneFormat,
  phonebookController.getSubscriberByPhonenumber
);
router.get(
  "/getPhonenumbersBelongToSubsriber",
  phonebookController.getPhonenumbersBelongToSubscriber
);

/* POST phonebook */
router.post(
  "/newPhonebook",
  validation.validatePhoneFormat,
  phonebookController.newPhonebook
);
router.post(
  "/deletePhoneBook",
  validation.validatePhoneFormat,
  phonebookController.deletePhonebook
);

module.exports = router;
