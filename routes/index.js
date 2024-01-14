const routes = require('express').Router();
const lesson1Controller = require('../controllers/lesson1');
 
routes.get('/', lesson1Controller.julieRoute);
routes.get('/shawn', lesson1Controller.shawnRoute);

module.exports = routes;

