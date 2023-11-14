const session = require('express-session');

const checkSession = (req, res) => {
    var ses = req.session;
    res.json('ID: ' + ses.userid + ' | User: ' + ses.username + ' | Role: ' + ses.role);
    console.log(req.session)
}

module.exports = {
    checkSession
}