const mongoose = require('mongoose');

const User = require('../models/user');

let actions = module.exports;

let secretCollections = ['user'];


//Get Data-----------------------------------------------------------------------------------------
actions.getData = function(req, res){
	const collectionName = req.body.collection;

	if(secretCollections.includes(collectionName))  return res.status(500).json({result: false, message: "Сollection does not exist."});

	//Create a new Schema for db action
	const Schema = new mongoose.Schema({},{ strict: false });
	mongoose.model(collectionName, Schema);

	//Delete wasted parameters
	delete req.body['collection'];
	delete req.body['method'];
	delete req.body['token'];
	delete req.body['id'];

	//Db action
	mongoose.model(collectionName).find(req.body, function(err, data) {
		if (err) return res.status(500).json({result: false, message: "There was a problem adding the information to the database."});
		
		res.status(200).json({result: true, data: data});
	})

	//Delete mongoose connection
	delete mongoose.connection.models[collectionName];
}

//Save Data-----------------------------------------------------------------------------------------
actions.saveData = function(req, res){
	const collectionName = req.body.collection;

	if(secretCollections.includes(collectionName))  return res.status(500).json({result: false, message: "Сollection does not exist."});

	//Create a new Schema for db action
	const Schema = new mongoose.Schema({},{ strict: false });
	mongoose.model(collectionName, Schema);

	//Delete wasted parameters
	delete req.body['collection'];
	delete req.body['method'];
	delete req.body['token'];
	delete req.body['id'];

	//Db action
	mongoose.model(collectionName).create(req.body, function(err, data) {
		console.log(collectionName)
		console.log(req.body)
		if (err) return res.status(500).json({result: false, message: "There was a problem adding the information to the database."});
		
		res.status(200).json({result: true, data: data});
	})

	//Delete mongoose connection
	delete mongoose.connection.models[collectionName];
}



//Update Data-----------------------------------------------------------------------------------------
actions.updateData = function(req, res){
	const collectionName = req.body.collection;
	const id = req.body.id;

	if(secretCollections.includes(collectionName))  return res.status(500).json({result: false, message: "Сollection does not exist."});

	//Condition for update
	const condition = id ? { _id: id } : null; //null does not allow to create an empty object in mongodb

	//Check if collection exist in mongodb
	const collectionExists = function(name, cb) {
	  	mongoose.connection.db.listCollections().toArray(function(err, collections) {
	    	if (err) return cb(err);

	    	cb(null, collections.some(function(coll) {
	      		return coll.name == name + 's';
	    	}));
	  	});
	}

	collectionExists(collectionName, function(err, collection) {
		if(!collection) return res.status(500).json({result: false, message: "Сollection does not exist."});

		if (!req.body.id || !req.body.collection) return res.status(400).json({"result": false, "message": "Collection or id is misiing."});

		//Create a new Schema for db action
		const Schema = new mongoose.Schema({},{ strict: false });
		mongoose.model(collectionName, Schema);

		//Delete wasted parameters
		delete req.body['collection'];
		delete req.body['method'];
		delete req.body['token'];
		delete req.body['id'];

		//Db action
		mongoose.model(collectionName).findOneAndUpdate(condition, req.body, { upsert: true, overwrite: true }, (err, data) => {
			if (err) return res.status(500).json({result: false, message: "There was a problem adding the information to the database."});
			
			res.status(200).json({result: true, "data": data});
		})

		//Delete mongoose connection
		delete mongoose.connection.models[collectionName];
	})
	
}


//Delete Data-----------------------------------------------------------------------------------------
actions.deleteData = function(req, res){
	const collectionName = req.body.collection;
	const id = req.body.id;

	if(secretCollections.includes(collectionName))  return res.status(500).json({result: false, message: "Сollection does not exist."});

	//Condition for update
	const condition = id ? { _id: id } : null; //null does not allow to create an empty object in mongodb

	//Check if collection exist in mongodb
	const collectionExists = function(name, cb) {
	  	mongoose.connection.db.listCollections().toArray(function(err, collections) {
	    	if (err) return cb(err);

	    	cb(null, collections.some(function(coll) {
	      		return coll.name == name + 's';
	    	}));
	  	});
	}

	collectionExists(collectionName, (err, collection) => {
		if(!collection) return res.status(500).json({result: false, message: "Сollection does not exist."});

		if (!req.body.id || !req.body.collection) return res.status(400).json({result: false, message: "Collection or id is misiing."});

		//Create a new Schema for db action
		const Schema = new mongoose.Schema({},{ strict: false });
		mongoose.model(collectionName, Schema);

		//Delete wasted parameters
		delete req.body['method'];
		delete req.body['token'];
		delete req.body['id'];

		//Db action
		mongoose.model(collectionName).findOneAndRemove(condition, function(err, data) {
			if (err) return res.status(500).json({result: false, message: "There was a problem adding the information to the database."});
			
			if (data) {
				res.status(200).json({result: true, data: data});
			} else {
				res.status(400).json({result: false, message: "Data does not exist."});
			}

			
		})

		//Delete mongoose connection
		delete mongoose.connection.models[collectionName];
	})
}