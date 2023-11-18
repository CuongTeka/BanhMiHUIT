const session = require('express-session');

const checkSession = (req, res) => {
    var acc = req.session.account;
    res.json('ID: ' + acc._id + ' | User: ' + acc.name + ' | Role: ' + acc.role);
    // console.log(req.session)
}

// const test = (req, res) => {
//     return res.json({message: "gi", err: "co"});
// }

module.exports = {
    checkSession
}