const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

app.use('/', contactsRoutes);

app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || port));
});

mongodb.initDb((err, mongodb) => {
  if (err) {
      console.log(err);
  } else {
      app.listen(port, () => {
          console.log(`Server running on http://localhost:${port}`);
        });
  }
}); 