// Importing npm package
const mongoose = require('mongoose');

// Importing module
const privateData = require('../../config/access-config.json');

const URL = 'mongodb+srv://' 
    + privateData.env['mongodb-cluster0-username'] 
    + ':'
    + privateData.env['mongodb-cluster0-passwd']
    + '@cluster0.ou3mo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const CONNECTION_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectToDatabase = async () => {
    try {
        await mongoose.connect(URL, CONNECTION_OPTIONS);
        console.log("Successfully connected to the database");    
    } catch (error) {
        console.log(error);
    }
}

// Exporting the database connection method
module.exports = connectToDatabase;