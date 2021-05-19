const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { MongoURI } = require('./config/default.json');
const router = require('./routes/router');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/', router);

mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch(function (err) {
    console.log(err);
  });

app.listen(process.env.PORT || 3000, function () {
  console.log('server running');
});
