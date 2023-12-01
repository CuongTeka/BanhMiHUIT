const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const dotenv = require('dotenv')
const webRoutes = require('./src/routes/web');



dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;



const oneYear = 1000 * 60 * 60 * 3600;


const corsOptions = {
    origin: process.env.FEURL,
    credentials: true,
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
    secret: 'banhmihuit',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneYear }
    }));
 
app.use('/api', webRoutes);


mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        // console.log('Connect Db success!')
    })
    .catch((err) => {
        // console.log(err)
    })
    app.listen(PORT, console.log(`Server started on port ${PORT}`));