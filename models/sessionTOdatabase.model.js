// to store session details to the mongoose database 

const session = require('express-session');

const mongoDBsession = require('connect-mongodb-session')(session)

const storeSession = new mongoDBsession({

    uri : 'mongodb://127.0.0.1:27017/SESSIONS',
    collection: 'UserSession'

})

module.exports = storeSession;