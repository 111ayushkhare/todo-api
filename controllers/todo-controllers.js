// Importing modules
const Task = require('../models/todo-model');

const addTask = async (req, res) => {
    try {
        let task = await Task.findOne({title: req.body.title});

        if(!task) {
            task = await new Task(req.body);
            task.save();

            res.send({
                message: "Task added successfully",
                status: 201,
                task_added: task
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

const updateTask = async (req, res) => {
    try {
        let task = await Task.updateOne({title: req.body.title}, req.body);

        if (task) {
            res.send({
                message: "Task updated successfully",
                status: 201,
                title: req.body.title
            });
        } else {
            res.send({
                message: "Task not found, add a new one",
                status: 406,
                error
            });
        }

    } catch(error) {
        res.send({
            message: "Failed to update the task",
            status: 404,
            error
        });
    }
};

const removeTask = async (req, res) => {
    try {
        let task = await Task.deleteOne({title: req.body.title});
        console.log(task);

        if (task.deletedCount == 1) {
            res.send({
                message: "Task deleted successfully",
                status: 200,
                title: req.body.title
            });
        } else if(task.deletedCount == 0) {
            res.send({
                message: "Task already absent",
                status: 410,
                error
            });
        }

    } catch (error) {
        res.send({
            message: "Failed to delete the task",
            status: 404,
            error
        });
    }
};

const readAllTasks = async (req, res) => {
    try {
        let allTasks = await Task.find({});

        if (allTasks.length > 0) {
            res.send({
                message: "Sending all the tasks",
                status: 200,
                total_tasks: allTasks.length,
                allTasks
            });
        } else {
            res.send({
                message: "No tasks found",
                status: 410,
            });
        }

    } catch(error) {
        res.send({
            message: "Failed to fetch the tasks",
            status: 404,
            error
        });
    }
};

const removeAllTasks = async (req, res) => {
    try {
        let task = await Task.deleteMany({});

        if (task) {
            res.send({
                message: "All the task are deleted",
                status: 200,
            });
        } else {
            res.send({
                message: "No tasks found to remove",
                status: 410
            });
        }

    } catch (error) {
        res.send({
            message: "Failed to delete the tasks",
            status: 404,
            error
        });
    }
};

// Exporting all above tasks crud operation methods
module.exports = {
    addTask,
    updateTask,
    removeTask,
    readAllTasks,
    removeAllTasks
};