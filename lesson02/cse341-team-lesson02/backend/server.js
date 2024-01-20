const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const mongodb = require("./db/connect");
const professionalRoutes = require("./routes/professional");

const app = express();
const port = process.env.PORT || 8080;


app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
  

// Define your /professional endpoint route
app.use("/professional", professionalRoutes);


mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
          });
    }
}); 

