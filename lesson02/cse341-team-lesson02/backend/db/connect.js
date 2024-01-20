const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://yangshawn14:NujNxtiag1213@cluster0.88crimc.mongodb.net/test";

let _db;

const initDb = (callback) => {
    if (_db) {
      console.log('Db is already initialized!');
      return callback(null, _db);
    }
    MongoClient.connect(url) // process.env.MONGODB_URL
      .then((client) => {
        _db = client;
        callback(null, _db);
      })
      .catch((err) => {
        callback(err);
      });
  };
  
  const getDb = () => {
    if (!_db) {
      throw Error('Db not initialized');
    }
    return _db;
  };
  
  module.exports = {
    initDb,
    getDb,
  };