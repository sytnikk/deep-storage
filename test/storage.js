process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const User = require('../app/models/user');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/server');
const should = chai.should();

chai.use(chaiHttp);

let token = '';
let dataId = '';

let userData = {
    name: 'Mykola Seattle',
    password: 'HardPasswordQwerty',
    email: 'nikolay.god@gmail.com',
    age: 23
};



describe('API flow', () => {
	it('Registration new user', (done) => {
		chai.request(server).post('/api/registration').send(userData)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('result').eql(true);
				done();
			})
	})

	it('Login and save token', (done) => {
		chai.request(server).post('/api/login').send(userData)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('result').eql(true);
				res.body.should.have.property('token').be.a('string');

				token = res.body.token;
				done();
			})
	})

	it('Save data to storage', (done) => {

		let saveStorageData = {
			method: 'save_data',
			collection: 'importantcollection',
			token: token,
			importantData: 'veryImportantData'
		}

		chai.request(server).post('/api/storage').send(saveStorageData)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('result').eql(true);
				res.body.should.have.property('data').be.a('object');


				dataId = res.body.data._id;
				done();
			})
	})

	it('Update data in storage', (done) => {

		let updateStorageData = {
			method: 'update_data',
			collection: 'importantcollection',
			id: dataId,
			token: token,
			importantData: 'veryImportantData',
			newImportantData: 'newImportantData'
		}

		chai.request(server).post('/api/storage').send(updateStorageData)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('result').eql(true);
				res.body.should.have.property('data').be.a('object');
				done();
			})
	})

	it('Delete data from storage', (done) => {

		let deletStorageData = {
			method: 'delete_data',
			collection: 'importantcollection',
			id: dataId,
			token: token
		};

		chai.request(server).post('/api/storage').send(deletStorageData)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('result').eql(true);
				res.body.should.have.property('data').be.a('object');
				done();
			})
	})

	it('Delete user using mongodb', (done) => {
		User.findOneAndRemove({email: userData.email}, (err, user) => {
			user.should.be.a('object');
			done();
		})
	})

})