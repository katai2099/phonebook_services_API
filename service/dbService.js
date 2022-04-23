const db = require("../models");

const PhoneNumber = db.phonenumber;
const Phonebook = db.phonebook;
const Subscriber = db.subscriber;
const Op = db.Op;

// phonebook

async function createNewPhonebookRecord(phonenumberId, subscriberId) {
  return await Phonebook.create({
    phonenumberId: phonenumberId,
    subscriberId: subscriberId,
  });
}

async function getAllRecords(req) {
  return await Phonebook.findAll({
    attributes: {
      exclude: [
        "id",
        "phonenumberId",
        "subscriberId",
        "createdAt",
        "updatedAt",
        "phoneNumberId",
      ],
    },
    include: [
      {
        model: Subscriber,
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      },
      {
        model: PhoneNumber,
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      },
    ],
  });
}

async function getSubscriberByPhonenumber(phonenumberId) {
  return Phonebook.findOne({
    where: {
      phonenumberId: phonenumberId,
    },
    attributes: {
      exclude: [
        "id",
        "phonenumberId",
        "subscriberId",
        "createdAt",
        "updatedAt",
        "phoneNumberId",
      ],
    },
    include: [
      {
        model: Subscriber,
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      },
    ],
  });
}

async function getPhonenumbersBelongToSubscriber(subscriberId) {
  return await Phonebook.findAll({
    where: {
      subscriberId: subscriberId,
    },
    attributes: {
      exclude: [
        "id",
        "phonenumberId",
        "subscriberId",
        "createdAt",
        "updatedAt",
        "phoneNumberId",
      ],
    },
    include: [
      {
        model: PhoneNumber,
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      },
    ],
  });
}

async function checkIfPairExist(subscriberId, phonenumberId) {
  return await Phonebook.count({
    where: {
      [Op.and]: [
        { subscriberId: subscriberId },
        { phonenumberId: phonenumberId },
      ],
    },
  });
}

async function deletePhonebook(subscriberId, phonenumberId) {
  //check if there is only one phonenumber belong to subscriber
  //if so we delete subscriber from subscriber table
  //otherwise we only remove from phonebook table and phonenumber table

  const subscriberCount = await Phonebook.count({
    where: {
      subscriberId: subscriberId,
    },
  });

  //remove phonenumber record

  const removePhonenumber = deletePhonenumber(phonenumberId);

  if (subscriberCount == 1) {
    const removeSubscriber = deleteSubscriber(subscriberId);
  }

  //remove phonebook record

  const removePhonebook = await Phonebook.destroy({
    where: {
      phonenumberId: phonenumberId,
    },
  });

  return removePhonebook;
}

// subscriber

async function createNewSubscriber(req) {
  return await Subscriber.create({
    name: req.body.subscriber,
  });
}

async function getSubscriberByName(subscriberName) {
  return await Subscriber.findOne({
    where: {
      name: subscriberName,
    },
  });
}

async function deleteSubscriber(subscriberId) {
  return await Subscriber.destroy({
    where: {
      id: subscriberId,
    },
  });
}

// phonenumber

async function createNewPhoneNumber(req) {
  return await PhoneNumber.create({
    phoneNumber: req.body.phonenumber,
  });
}

async function getPhoneNumber(phonenumber) {
  return await PhoneNumber.findOne({
    where: {
      phoneNumber: phonenumber,
    },
  });
}

async function deletePhonenumber(phonenumberId) {
  return await PhoneNumber.destroy({
    where: {
      id: phonenumberId,
    },
  });
}

module.exports = {
  createNewPhoneNumber,
  getPhoneNumber,
  createNewSubscriber,
  getSubscriberByName,
  createNewPhonebookRecord,
  getAllRecords,
  getSubscriberByPhonenumber,
  getPhonenumbersBelongToSubscriber,
  deletePhonebook,
  checkIfPairExist,
};
