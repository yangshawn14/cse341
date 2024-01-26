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

module.exports = { getAll, getSingle, createContact };
