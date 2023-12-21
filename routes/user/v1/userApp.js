var express = require('express');
var route = express.Router();
const UserController = require("../../../controllers/User/v1/UserController");


//--------------------------------------------------------------ADMINISTRATION CONTROLLER -------------------------------------------------------------------------------
route.post('/create_task', UserController.createTask);
route.get('/get_task', UserController.getTask);
route.put('/update_task', UserController.updateTask);
route.delete('/delete_task', UserController.deleteTask);




module.exports = route;
