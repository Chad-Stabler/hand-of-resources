const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/dogs', require('./controllers/dogs'));
app.use('/snakes', require('./controllers/snakes'));
app.use('/candy', require('./controllers/candy'));
app.use('/lizards', require('./controllers/lizards'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
