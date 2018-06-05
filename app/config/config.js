let config = module.exports;

config.jwtSecret = 'your_secret'

config.express = {
    port: process.env.EXPRESS_PORT || 3000,
    ip: '127.0.0.1'
}

config.mongodb = {
    port: process.env.MONGODB_PORT || 27017,
    host: process.env.MONGODB_HOST || 'localhost'
}

config.facebookAuth = {
    clientID: 'your-secret-clientID-here',
    clientSecret: 'your-client-secret-here',
    callbackURL: 'http://localhost:8080/auth/facebook/callback'
}

config.twitterAuth = {
    consumerKey: 'your-consumer-key-here',
    consumerSecret: 'your-client-secret-here',
    callbackURL: 'http://localhost:8080/auth/twitter/callback'
}

config.googleAuth = {
    clientID: 'your-secret-clientID-here',
    clientSecret: 'your-client-secret-here',
    callbackURL: 'http://localhost:8080/auth/google/callback'
}