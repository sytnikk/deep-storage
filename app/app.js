const express = require('express');
const app = express();
const bodyParser = require('body-parser');
global.__root   = __dirname + '/'; 

require('./config/passport');

app.post('/api', (req, res) => {
    res.status(200).send('Hello Dolly!');
})

app.use(bodyParser.json())

app.use('/api', require(__root + 'auth/auth'));
app.use('/api', require(__root + 'storage/storage'));
app.use(require(__root + 'admin/admin'));

module.exports = app;