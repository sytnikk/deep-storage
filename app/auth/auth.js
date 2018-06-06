const express = require('express');
const auth = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');

const config = require('../config/config');

const User = require('../models/user');



const signToken = function({name, email, password, _id, role}, secret, time) {
    let userData = {name, email, password, _id, role};
    return jwt.sign(userData, secret)
}



const registration = function(req, res){
    passport.authenticate('local-registration', {session: false}, (err, user, info) => {
          if (err || !user) {
              return res.status(400).json({result: false, message: info.message});
          }

          req.login(user, {session: false}, (err) => {
             if (err) {
                 res.send(err);
             }
             const token = signToken(user.toJSON(), config.jwtSecret);

             user['password'] = undefined;
             user['role'] = undefined;

             return res.json({result: true, data: user, token});
          });
      })(req, res);
}



const login = function(req, res){
    passport.authenticate('local-login', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({result: false, message: info.message});
        }

        req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           const token = signToken(user.toJSON(), config.jwtSecret);

           user['password'] = undefined;
           user['role'] = undefined;

           return res.json({result: true, data: user, token});
        });
    })(req, res);
}



auth.post('/registration', registration);
auth.post('/login', login);

auth.get('/registration', registration);
auth.get('/login', login);

module.exports = auth;