// Importing modules
const Task = require('../models/todo-model');

const addTask = async (req, res) => {
    try {
        let task = await Task.findOne({
            owner: req.id, 
            title: req.body.title
        });

        if (!task) {
            task = new Task({
                ...req.body,
                owner: req.id
            });
            await task.save();

            res.status(201).send({
                message: "Task added successfully",
                task
            });
        } else {
            res.status(400).send({ message: "Task already exists" });
        }

    } catch(error) {
        res.status(400).send({
            message: "Failed to add the task",
            error
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            {
                owner: req.id, 
                title: req.body.title
            }, 
            {
                ...req.body,
                owner: req.id 
            }, 
            {
                new : true
            }
        );

        if (task) {
            res.status(201).send({ 
                message: "Task updated successfully",
                task 
            });
        } else {
            res.status(406).send({
                message: "Task not found, add a new one",
                error
            });
        }

    } catch(error) {
        res.status(404).send({
            message: "Failed to update the task",
            error
        });
    }
};

const removeTask = async (req, res) => {
    try {
        let task = await Task.findOneAndDelete({
            owner: req.id,
            title: req.body.title
        });

        if (task) {
            res.status(200).send({
                message: "Task deleted successfully",
                title: req.body.title
            });
        } else {
            res.status(410).send({
                message: "Task already absent",
                error
            });
        }

    } catch (error) {
        res.status(404).send({
            message: "Failed to delete the task",
            error
        });
    }
};

const readAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find({ owner: req.id });

        if (allTasks.length > 0) {
            res.status(200).send({
                message: "Sending all the tasks",
                totalTasks: allTasks.length,
                allTasks
            });
        } else {
            res.status(410).send({ message: "No tasks found" });
        }

    } catch(error) {
        res.status(404).send({
            message: "Failed to fetch the tasks",
            error
        });
    }
};

const removeAllTasks = async (req, res) => {
    try {
        const task = await Task.deleteMany({ owner: req.id });

        if (task.deletedCount) {
            res.status(200).send({ message: "All the task are removed" });
        } else {
            res.status(410).send({ message: "No tasks found to remove" });
        }

    } catch (error) {
        res.status(404).send({
            message: "Failed to delete the tasks",
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