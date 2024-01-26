const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const MongoClient = require('mongodb').MongoClient;
const contactsRoutes = require('./routes');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

app.use('/', contactsRoutes);



mongodb.initDb((err, mongodb) => {
  if (err) {
      console.log(err);
  } else {
      app.listen(port, () => {
          console.log(`Server running on http://localhost:${port}`);
        });
  }
}); 