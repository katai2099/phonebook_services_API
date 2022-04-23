const req = require("express/lib/request");
const db = require("../service/dbService");

newPhonebook = async (req, res) => {
  try {
    //check if phonenumber already existed
    const phonenumber = await db.getPhonenumber(req.body.phonenumber);
    if (phonenumber) {
      return res.status(400).send({ message: "Phonenumber already existed" });
    }

    //add phonenumber to phonenumber table
    const newPhonenumber = await db.createNewPhonenumber(req);
    const phonenumberId = newPhonenumber.id;

    //if exist user we just add phonenumber to phonebook
    let subscriberId = -1;
    const subscriber = await db.getSubscriberByName(req.body.subscriber);
    if (subscriber == null) {
      //add subscriber to subscriber table
      const newSubscriber = await db.createNewSubscriber(req);
      subscriberId = newSubscriber.id;
    } else {
      subscriberId = subscriber.id;
    }
    //add both phonenumber and subscriber to phonebook table
    const phonebook = await db.createNewPhonebookRecord(
      phonenumberId,
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
    const phonenumber = await db.getPhonenumber(req.body.phonenumber);
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
    const phonenumber = await db.getPhonenumber(req.body.phonenumber);
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
