// Importing npm packages
const express = require('express');

// Importing modules
const dbConnector = require('./models/db/mongodb-connector');
const authRoutes = require('./routes/auth-routes');
const todoRoutes = require('./routes/todo-routes');

// Constants used in this file
const app = express();
const PORT = process.env.PORT || 3000;

// Method call to connect to the mongodb-database
dbConnector();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);

// Start the server by listening to the specified port
app.listen(PORT, () => {
    console.log("Server is up and running at http://localhost:" + PORT);
});