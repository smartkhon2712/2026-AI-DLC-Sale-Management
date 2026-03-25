require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

// Main Route Entry 
app.use('/api/v1', routes);

// Global Error Handler overrides generic Express errors
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Backend Server] Sale Management REST API running on port ${PORT}`);
  });
}

module.exports = app;
