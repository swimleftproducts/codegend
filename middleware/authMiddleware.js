const passport = require('passport')
const session = require('express-session')
const MongoStore= require('connect-mongo')
const {getDbConnectionString} = require('../config/dbConfig');

const Store = MongoStore.create({
    mongoUrl: getDbConnectionString(),
    mongoOptions: {useNewUrlParser:true,useUnifiedTopology:true},
    collectionName: 'sessions'
})

require('../authConfig')

module.exports=(app) => {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: Store,
        cookie:{maxAge: (1000*60*10*60)}
        //should add time to cookie
    }))

    //calls to get passport set up
    app.use(passport.initialize())
    app.use(passport.session())
}