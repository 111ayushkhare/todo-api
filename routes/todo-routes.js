// Importing npm package
const router = require('express').Router();

// Importing modules
const todoControllers = require('../controllers/todo-controllers');

router.post('/add-task', async (req, res) => {
    todoControllers.addTask(req, res);
});

router.put('/update-task', async (req, res) => {
    todoControllers.updateTask(req, res);
});

router.delete('/remove-task', async (req, res) => {
    todoControllers.removeTask(req, res);
});

router.get('/read-all-tasks', async (req, res) => {
    todoControllers.readAllTasks(req, res);
});

router.delete('/remove-all-tasks', async (req, res) => {
    todoControllers.removeAllTasks(req, res)
});

// Exporting all the above defined task router
module.exports = router;