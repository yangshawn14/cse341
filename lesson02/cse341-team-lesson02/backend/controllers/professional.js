const mongodb = require("../db/connect");

const getData = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('test').find();
  result.toArray().then((lists) => {
    console.log(lists[0]); // Add this line for debugging
    res.setHeader("Content-type", "application/json");
    res.status(200).json(lists[0].user);
  });
};

module.exports = { getData }
