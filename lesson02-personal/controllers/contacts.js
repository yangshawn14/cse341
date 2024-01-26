const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

// const getSingle = async (req, res, next) => {
//   const userId = new ObjectId(req.params.id);
//   const result = await mongodb.getDb().db().collection('contacts').find({ _id: userId });
//   result.toArray().then((lists) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.status(200).json(lists[0]);
//   });
// };

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

module.exports = { getAll, getSingle };
