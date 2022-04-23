const { HUNGARIAN_PHONE_FORMAT } = require("../constants");

const hungarianPhonenumberRegex = HUNGARIAN_PHONE_FORMAT;

validatePhoneFormat = async (req, res, next) => {
  // const regex = /((?:\+?3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})/;
  if (!req.body.phonenumber.match(hungarianPhonenumberRegex)) {
    return res.status(400).send({ message: "Invalid Phonenumber" });
  }
  next();
};

validatePhoneFormatInQuery = async (req, res, next) => {
  if (!req.query.phonenumber.match(hungarianPhonenumberRegex)) {
    return res.status(400).send({ message: "Invalid Phonenumber" });
  }
  next();
};

module.exports = {
  validatePhoneFormat,
  validatePhoneFormatInQuery,
};
