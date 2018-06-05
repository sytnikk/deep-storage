const express = require('express');
const admin = express.Router();

const passport = require('passport');

const mongoose = require('mongoose');


admin.get('/admin', passport.authenticate('jwt-GET', {session: false}), (req, res) => {
	console.log(req.query)
	res.sendFile(global.__root + 'admin/admin.html');
});


module.exports = admin;