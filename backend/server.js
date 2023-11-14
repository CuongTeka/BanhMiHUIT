const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const app = express();
const webRoutes = require('./src/routes/web');
const auth = require('./src/controllers/authController');
const { body } = require("express-validator");
const checkAtlasConnection = require('./src/models/mongoose')
require('dotenv').config();

const oneYear = 1000 * 60 * 60 * 3600;
checkAtlasConnection;

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'banhmihuit',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneYear }
    }));
app.use('/', webRoutes);
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());






 
const PORT = process.env.PORT || 8080;
// console.log(process.env.DBURL)
// console.log(process.env.PORT)
app.listen(PORT, console.log(`Server started on port ${PORT}`));