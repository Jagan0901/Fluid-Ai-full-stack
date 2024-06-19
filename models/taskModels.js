const mongoose = require("mongoose");

const taskModel = mongoose.Schema({
  title: { type: String},
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String },
  status: { type: String }
});
 
const Task = mongoose.model("Task",taskModel);

module.exports = Task;