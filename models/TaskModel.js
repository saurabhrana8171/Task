const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');
mongoose.set('debug', false);

const taskSchema = new mongoose.Schema({

    taskName: { type: String, default: "" },

    taskPriority: { type: Number, default: 0 },

    createdDate: { type: Date, default: Date.now },

});

// Define indexes
taskSchema.index({ taskPriority: 1 });


taskSchema.plugin(mongoosePaginate);

let TaskModel = mongoose.model("task", taskSchema);

module.exports = TaskModel;
