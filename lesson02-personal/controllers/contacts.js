const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Get all contacts
const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// Get by ID
const getSingle = async (req, res, next) => {
  const idString = req.params.id;
  console.log('Received id parameter:', idString);

  try {
    const userId = new ObjectId(idString);
    console.log('Converted ObjectId:', userId);

    const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    console.error('Error converting ObjectId:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create new contact
const createContact = async (req, res, next) => {
  try {
    // Extract contact data from the request body
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Insert the new contact into the MongoDB collection
    const result = await mongodb.getDb().db().collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    // Send a success response
    res.status(201).json({ message: 'Contact created successfully', contactId: result.insertedId });
  } catch (error) {
    // Handle any errors
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Failed to create contact' });
  }
};

// Update contact info
const updateContact = async (req, res, next) => {
  const contactId = new ObjectId(req.params.id);
  const newContactData = req.body; // Assuming the request body contains the new contact data

  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .replaceOne(
        { _id: contactId },
        newContactData
      );

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Contact replaced successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error replacing contact:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete contact
const deleteContact = async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'Contact replaced successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
