const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
// var flash = require('connect-flash');
var bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();
const webRoutes = require('./src/routes/web');
const postRoutes = require('./src/routes/post');
const auth = require('./src/controllers/authController');
// const { body } = require("express-validator");
const checkAtlasConnection = require('./src/models/mongoose')
require('dotenv').config();

const oneYear = 1000 * 60 * 60 * 3600;
checkAtlasConnection;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
app.use(cors(corsOptions));

app.use(express.json());
// app.use(cors({origin: true, credentials: true}));
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
app.use('/api', postRoutes)
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

// const setCors = () => {
//     let corsOptions = {
//         origin: true
//     }
//     this.app.use(cors(corsOptions));
// }






 
const PORT = process.env.PORT || 8080;
// console.log(process.env.DBURL)
// console.log(process.env.PORT)
app.listen(PORT, console.log(`Server started on port ${PORT}`));