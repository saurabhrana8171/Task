
const Helper = require('../../../config/helper');
const TaskModel = require('../../../models/TaskModel');

module.exports = {

    createTask: async (req, res) => {
        try {
            if (await TaskModel.exists({ taskName: req.body.taskName })) return Helper.response(res, 422, "The  task name you provided is already registered. Please use a different name.");
            if (await TaskModel.exists({ taskPriority: req.body.taskPriority })) return Helper.response(res, 422, "The  task Priority  you provided is already exists. Please use a different Priority.");
            const newTask = await new TaskModel(req.body).save();
            return Helper.response(res, 200, "Task create successfully");
        } catch (err) {
            console.error(err);
            return Helper.response(res, 500, "An error occurred while processing your request. Please try again later.", err);
        }

    },

    getTask: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;

            var searchObj = {}
            const total = await TaskModel.countDocuments(searchObj);
            const tasks = await TaskModel
                .find(searchObj)
                .sort({ taskPriority: 1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean();

            const AllTasks = await Helper.pagination(total, page, limit);
            AllTasks.data = tasks;

            return Helper.response(res, 200, "All tasks records retrieved successfully.", { Tasks: AllTasks });
        } catch (err) {
            console.error(err);
            return Helper.response(res, 500, "An error occurred while processing your request. Please try again later.", err);
        }
    },

    updateTask: async (req, res) => {
        try {
            const { _id, taskName } = req.body;
            if (!await TaskModel.exists({ _id })) return Helper.response(res, 422, "task not found. Please check the task ID and try again.");
            if (await TaskModel.exists({ taskName: req.body.taskName })) return Helper.response(res, 422, "The  task name you provided is already registered. Please use a different name.");

            const updatedTask = await TaskModel.findOneAndUpdate({ _id }, { taskName }, { new: true });
            if (!updatedTask) return Helper.response(res, 500, "Failed to update task name.");

            return Helper.response(res, 200, "Task name updated successfully.");
        } catch (err) {
            console.error(err);
            return Helper.response(res, 500, "An error occurred while processing your request. Please try again later.", err);
        }
    },

    deleteTask: async (req, res) => {
        try {
            const { taskId } = req.query;
            const deletedTask = await TaskModel.deleteOne({ _id: taskId });
            if (!deletedTask) return Helper.response(res, 404, "Task not found or already deleted.");
            return Helper.response(res, 200, "Task deleted successfully");
        } catch (err) {
            console.error(err);
            return Helper.response(res, 500, "An error occurred while processing your request. Please try again later.", err);
        }
    }
}
