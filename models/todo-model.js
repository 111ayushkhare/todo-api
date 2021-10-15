// Importing npm package
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true
    }, 
    body: String,
    completed: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Exporting the task model
module.exports = mongoose.model('Task', taskSchema);