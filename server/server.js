'use strict'
let express = require('express');
let mongoose = require('mongoose');
// let contactRoute = require('./api/contact');
// let registrationRoute = require('./api/registration');
let userRoute = require('./api/users');
let auth = require('./api/auth');
let voucherRoute = require('./api/vouchers');
let fileUpload = require('./api/upload');


let app = express();

let env = require("dotenv").config();
// let cors = require('cors');
let bodyParser = require('body-parser');
// const path = require('path');


// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'build')));
/**
 * Mongo DB Connection
 */
//Local MongoDB Connection
// mongoose.connect(process.env.LOCAL, {useNewUrlParser: true, useUnifiedTopology: true});
// // MongoDB Atlas Connection
mongoose.connect(process.env.ATLAS_CONSTR), {useNewUrlParser: true, useUnifiedTopology: true };
var db = mongoose.connection;
//bind error info
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to DB');
});



// app.get('/', function (req, res) {
//     res.send({ message: 'API Initialized!' });
//     console.log('Api initialized');
// });

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use('/api', auth);
// app.use('/secure',router);

// app.use('/api', contactRoute);
// app.use('/api', registrationRoute);
app.use('/api', userRoute);
app.use('/api', voucherRoute);
app.use('/api', fileUpload);

//starts the server and listens for requests
let server = app.listen(process.env.PORT || 5000, function () {
    let port = server.address().port;
    console.log('api now running on port', port);
});
