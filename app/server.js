const app = require('./app');
const config = require('./config/config');
const mongoose = require('mongoose')

mongoose.connect('mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/app', (error) => {
    if(error) {
        console.log('Mongo error:' ,error);
    }
    console.log('Mongo connected!')
});

app.listen(config.express.port, config.express.ip, (error) => {
    if(error) {
        console.log('Server error:' ,error);
    }

    console.log('Express is listening on port: ' + config.express.port + '!');
    console.log('Express is listening on ip: ' + config.express.ip + '!');
})

module.exports = app;