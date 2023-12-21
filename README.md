# Project API Documentation

## Installation

Before running the project, make sure to install the required dependencies.

npm install
npm run dev

## Add a new task.

- **Endpoint:** {{local}}/api/v1/user/add_task
- **Method:** POST
- **Body:** { "taskName": "xyz", "taskPriority": any Value }


## Update Task (POST)

Update the name of a task.

- **Endpoint:** {{local}}/api/v1/user/update_task
- **Method:** POST
- **Body:** { "_id": "xyz", "taskName": "xyz" }

## Get Tasks (GET)

Get a list of tasks with pagination.

- **Endpoint:** {{local}}/api/v1/user/get_task
- **Method:** GET
- **Query Parameters:** limit (optional), page (optional).

## Update Task (PUT)

Update the name of a task using the PUT method.

- **Endpoint:** {{local}}/api/v1/user/update_task
- **Method:** PUT
- **Body:** { "_id": "xyz", "taskName": "xyz" }

## Delete Task (DELETE)

Delete a task.

- **Endpoint:** {{local}}/api/v1/user/delete_task
- **Method:** DELETE
- **Query Parameter:** taskId

## Add Task (POST)

