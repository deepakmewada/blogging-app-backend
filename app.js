const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config()

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/complaintDb').then((res) => {
  console.log("Complain Database Connected")
}).catch(err => console.log("Err", err)); 

const reportRoute = require('./routes/report.route')
const authRoute = require('./routes/auth.route');
const uploadRoute = require('./routes/upload.route');
const middleware = require('./utils/middleware');

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use('/auth', authRoute);
app.use('/upload', uploadRoute);
app.use('/report', reportRoute)

app.listen(3001, () => {
    console.log('Server Running on Port 3001...')
})