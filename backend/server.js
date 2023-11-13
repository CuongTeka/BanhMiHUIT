const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
const app = express();
const webRoutes = require('./src/routes/web');
const auth = require('./src/controllers/authController');
const { body } = require("express-validator");
const mongoo = require('./src/models/mongoose')
require('dotenv').config();


mongoo;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', webRoutes);
// app.use(session({
//     secret: 'adsa897adsa98bs',
//     resave: false,
//     saveUninitialized: false,
//     }));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());






 
const PORT = process.env.PORT || 8080;
// console.log(process.env.DBURL)
// console.log(process.env.PORT)
app.listen(PORT, console.log(`Server started on port ${PORT}`));