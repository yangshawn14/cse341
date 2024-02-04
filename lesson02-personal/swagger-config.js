const doc = {
    info: {
        title: 'Contacts API',
        description: 'This is my Contacts API',
        version: '1.0.0',
    },
    host: 'https://connect-mongodb.onrender.com',
    schemes: ['http'],
};

const outputFile = './swagger.json';

module.exports = { doc, outputFile };
