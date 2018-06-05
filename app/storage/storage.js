const express = require('express');
const storage = express.Router();

const passport = require('passport');

const actions = require('./actions.js');


const storageActions = function(req, res){

	switch(req.body.method) {
		case 'get_data':
			actions.getData(req, res)
			break;
		case 'save_data':
			actions.saveData(req, res)
			break;
		case 'delete_data':
			actions.deleteData(req, res)
			break;
		case 'update_data':
			actions.updateData(req, res)
			break;
		default:
			res.status(400).json({message: "No method"});
	}
}


storage.post('/storage', passport.authenticate('jwt-Storage-POST', {session: false}), storageActions);
storage.get('/storage', passport.authenticate('jwt-GET', {session: false}), storageActions);

module.exports = storage;