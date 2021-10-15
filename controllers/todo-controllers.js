// Importing modules
const Task = require('../models/todo-model');

const addTask = async (req, res) => {
    try {
        let task = await Task.findOne({title: req.body.title});

        if(!task) {
            await new Task(req.body);
            res.send({
                message: "Task added successfully",
                status: 200,
                title: req.body.title
            });
        } else {
            res.send({
                message: "Task already present",
                status: 400,
                title: req.body.title
            });
        }

    } catch(error) {
        res.send({
            message: "Failed to add the task",
            status: 404,
            error
        });
    }
};

const updateTask = (req, res) => {};

const removeTask = (req, res) => {};

const readAllTasks = (req, res) => {};

const removeAllTasks = (req, res) => {};

// Exporting all above tasks crud operation methods
module.exports = {
    addTask,
    updateTask,
    removeTask,
    readAllTasks,
    removeAllTasks
};