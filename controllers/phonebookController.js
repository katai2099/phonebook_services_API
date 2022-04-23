const req = require("express/lib/request");
const db = require("../service/dbService");

newPhonebook = async (req, res) => {
  try {
    //check if phoneNumber already existed
    const phonenumber = await db.getPhoneNumber(req.body.phonenumber);
    if (phonenumber) {
      return res.status(400).send({ message: "Phonenumber already existed" });
    }

    //add phoneNumber to phonenumber table
    const newPhoneNumber = await db.createNewPhoneNumber(req);
    const phoneNumberId = newPhoneNumber.id;

    //(check if already exist user otherwise we just add phonenumber)
    let subscriberId = -1;
    const subscriber = await db.getSubscriberByName(req.body.subscriber);
    if (subscriber == null) {
      //add subscriber to subscriber table
      const newSubscriber = await db.createNewSubscriber(req);
      subscriberId = newSubscriber.id;
    } else {
      subscriberId = subscriber.id;
    }
    //add both phoneNumber and subscriber to phonebook table
    const phonebook = await db.createNewPhonebookRecord(
      phoneNumberId,
      subscriberId
    );
    if (phonebook) {
      return res
        .status(200)
        .send({ message: "Successfully add new phonebook " });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

getAllPhonebookRecords = async (req, res) => {
  // handle empty case
  try {
    const phonebooks = await db.getAllRecords();

    if (phonebooks) {
      return res.json(phonebooks);
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

getSubscriberByPhonenumber = async (req, res) => {
  // check if phonenumber exist
  try {
    const phonenumber = await db.getPhoneNumber(req.query.phonenumber);
    if (phonenumber) {
      const record = await db.getSubscriberByPhonenumber(phonenumber.id);
      return res.json(record);
    } else {
      res.status(400).send({ message: "No such record" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

getPhonenumbersBelongToSubscriber = async (req, res) => {
  try {
    // check if subscriber exist
    const subscriber = await db.getSubscriberByName(req.query.subscriber);
    if (subscriber) {
      const records = await db.getPhonenumbersBelongToSubscriber(subscriber.id);
      return res.json(records);
    } else {
      res.status(400).send({ message: "No such record" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

deletePhonebook = async (req, res) => {
  try {
    //check if phonenumber exist
    const phonenumber = await db.getPhoneNumber(req.body.phonenumber);
    if (phonenumber == null) {
      return res.status(400).send({ message: "No such phonenumber" });
    }
    //check if subscriber exist
    const subscriber = await db.getSubscriberByName(req.body.subscriber);
    if (subscriber == null) {
      return res.status(400).send({ message: "No such subscriber" });
    }

    //check if pair exist in phonebook
    const pair = await db.checkIfPairExist(subscriber.id, phonenumber.id);
    if (pair == 0) {
      return res.status(400).send({
        message: "There is no phonenumber associated with the subscriber",
      });
    }

    //delete record
    const deletion = await db.deletePhonebook(subscriber.id, phonenumber.id);
    return res.status(200).send({ message: "Successfully removed" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  newPhonebook,
  getAllPhonebookRecords,
  getSubscriberByPhonenumber,
  getPhonenumbersBelongToSubscriber,
  deletePhonebook,
};
