const doc = {
  info: {
    title: 'Contacts API',
    description: 'This is my Contacts API',
    version: '1.0.0',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger.json';

module.exports = { doc, outputFile };
