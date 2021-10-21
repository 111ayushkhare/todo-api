// Importing npm package
const router = require('express').Router();

// Importing modules
const todoControllers = require('../controllers/todo-controllers');
const isLoggedIn = require('../middleware/auth-middleware');

router.post('/add-task', isLoggedIn, async (req, res) => {
    todoControllers.addTask(req, res);
});

router.put('/update-task', isLoggedIn, async (req, res) => {
    todoControllers.updateTask(req, res);
});

router.get('/read-particular-user-all-tasks', isLoggedIn, async (req, res) => {
    todoControllers.readAllTasks(req, res);
});

router.delete('/remove-task', isLoggedIn, async (req, res) => {
    todoControllers.removeTask(req, res);
});

router.delete('/remove-particular-user-all-tasks', isLoggedIn, async (req, res) => {
    todoControllers.removeAllTasks(req, res);
});

// Exporting all the above defined task router
module.exports = router;