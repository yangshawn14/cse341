const mongodb = require("../db/connect");

const getData = async (res, req, next) => {
  const result = await mongodb.getDb().db().collection('test').find();
  result.toArray().then((lists) => {
    res.setHeader("Content-type", "application/json");
    res.status(200).json(lists[0]);
  });
};

module.exports = { getData }
