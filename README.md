## TODO app api
This is a todo app REST-API made in Node.Js with basic CRUD operations along with authentication functionality (Logout still remains). 

### Runninng Server
To run the server first you must add ***'access-config.json'*** inside **'config'** directory as shown in the Project Structure below and add the following code exactly same by assigning your 'secret access keys' in the values of the keys - 

```
{
    "env" : {
        "mongodb-cluster0-username": <your_mondodb_atlas_database_username>,
        "mongodb-cluster0-password": <your_mondodb_atlas_database_password>,
        "JWT_ACCESS": <your_jwt_secret_key>
    }
}
```

Then install all the required packages as mentioned in **'package.json'** file.

After all this, just type 
```
npm start
```
in the terminal (Make sure there is internet connectivity otherwise this server can't connect to the mongodb atlas database).

### Project Structure
```sh
todo-api
    |- config
    |   `- access-config.json
    |- controllers
    |   |- auth-controllers.js
    |   `- todo-controllers.js
    |- middleware
    |   `- auth-middleware.js
    |- models
    |   |- db
    |   |   `- mongodb-connector.js
    |   |- todo-model.js
    |   `- user-model.js
    |- node_modules
    |   :- ..
    |   :- ..
    |   `- ..
    |- routes
    |   |- auth-routes.js
    |   `- todo-routes.js
    |- .gitignore
    |- app.js
    |- package-lock.json
    |- package.json
    `- README.md
```