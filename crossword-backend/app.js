const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const logicRoutes = require('./routes/logic');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/', logicRoutes);

// Start the server
const port = 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
