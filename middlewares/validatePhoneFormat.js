const { HUNGARIAN_PHONE_FORMAT } = require("../constants");

const hungarianPhonenumberRegex = HUNGARIAN_PHONE_FORMAT;

validatePhoneFormat = async (req, res, next) => {
  let matched = req.body.phonenumber.match(hungarianPhonenumberRegex);
  if (!matched || matched[0].length !== req.body.phonenumber.length) {
    return res.status(400).send({ message: "Invalid Phonenumber" });
  }
  next();
};

module.exports = {
  validatePhoneFormat,
};
