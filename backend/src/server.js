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

const checkAndSeed = require('./utils/seed');

if (process.env.NODE_ENV !== 'test') {
  // Run seed check before starting server
  checkAndSeed()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`[Backend Server] Sale Management REST API running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('[Error] Server failed to start due to seed errors:', error);
      process.exit(1);
    });
}

module.exports = app;
