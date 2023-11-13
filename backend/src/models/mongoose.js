const mongoose = require('mongoose');
const url = process.env.DBURL || 'mongodb+srv://admin:123@qlbanmi.qonjmak.mongodb.net/QLBM/?retryWrites=true&w=majority';
//check database connect
mongoose.connect(url ,{dbName: 'QLBM'})
.then(() => console.log('Atlas Connected!'));