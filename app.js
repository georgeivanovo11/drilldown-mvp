const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB
const config = require('./config/config.json');
require('./src/models/segment');

mongoose.connect(config['databaseURL']);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

const segmentRoutes = require('./src/routes/segment-routes');
const storageRoutes = require('./src/routes/storage-routes');

app.use('/api/segments', segmentRoutes);
app.use('/storage', storageRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json(err);
});

app.listen(port, () => {
  console.log(`Listening on port ${chalk.green(port)}`);
});
