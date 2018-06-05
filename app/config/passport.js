
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const bcrypt = require('bcryptjs');

const config = require('../config/config');
let validation  = require('../config/validation');

const User = require('../models/user');

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    },
    function(req, email, password, cb) {
        process.nextTick(function() {


            if(!validation.isEmail(email)) {
                return cb(null, false, {message: 'Invalid email format.'});
            }
            if(validation.isPassword(email)) {
                return cb(null, false, {message: 'Invalid password. Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.'});
            }

            User.findOne({'email': email}, (err, user) => {
                if(err) {
                    return cb(err);
                }

                if(!user) {
                    return cb(null, false, {message: 'Incorrect email or password.'});
                }

                bcrypt.compare(password, user.password, (err, res) => {

                    if (err) {
                        return cb(err);
                    }

                    if (res) {
                        return cb(null, user, {message: 'Logged In Successfully'});
                    } else {
                        return cb(null, false, {message: 'Incorrect email or password.'});
                    }
                })

                
            })
        })
    }
))
passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    },
    function(req, email, password, cb) {
        process.nextTick(function() {

            if(!validation.isEmail(email)) {
                return cb(null, false, {message: 'Invalid email format.'});
            }

            if(validation.isPassword(email)) {
                return cb(null, false, {message: 'Invalid password. Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.'});
            }

            User.findOne({'email': email}, (err, user) => {
                if(err) return cb(err);

                

                if(user) {
                    return cb(null, false, {message: 'That email is already taken.'});
                } else {
                    User.create(req.body, function(err, user) {
                        if(err) return cb(null, false, {message: "There was a problem adding the information to the database."});

                        return cb(null, user, {message: 'Signed In Successfully'});
                    })
                    
                }
            })
        })
        
    }
))

passport.use('jwt-Storage-POST',new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromBodyField('token'),
        secretOrKey   : config.jwtSecret
    },
    function (jwtPayload, cb) {
        console.log(jwtPayload)
        // return cb(null, jwtPayload)
        return User.findOne({'_id': jwtPayload._id}, (err, user) => {
            if(err) {
                return cb(err);
            }
            return cb(null, user);
        })
    }
));

passport.use('jwt-GET', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token'),
        secretOrKey   : config.jwtSecret
    },
    function (jwtPayload, cb) {
        console.log(jwtPayload)
        // return cb(null, jwtPayload)
        return User.findOne({'_id': jwtPayload._id}, (err, user) => {
            if(err) {
                return cb(err);
            }
            return cb(null, user);
        })
    }
));

passport.use('jwt-ADMIN', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromUrlQueryParameter('token'),
        secretOrKey   : config.jwtSecret
    },
    function (jwtPayload, cb) {
        console.log(jwtPayload)
        // return cb(null, jwtPayload)
        return User.findOne({'_id': jwtPayload._id}, (err, user) => {
            if(err) {
                return cb(err);
            }
            return cb(null, user);
        })
    }
));