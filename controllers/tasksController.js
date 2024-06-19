const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModels");


//@description     Create Task
//@route           POST /api/task/
//@access          Protected
const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority,status } = req.body;

  if (!title || !description || !dueDate || !priority || !status) {
    return res.status(404).send({ error: "Please fill outs the fields" });
  }

    const taskData = {
        title:title,
        description:description,
        dueDate:dueDate,
        status:status,
        priority:priority
    }

    try {
      const createdChat = await Task.create(taskData);
      res.status(200).send({message:"Task Created Successfully"});
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
);

//@description     Fetch all tasks
//@route           GET /api/task/
//@access          Protected
const getTasks = asyncHandler(async (req, res) => {
  try {
    const task = await Task.find();
    res.send(task);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Get task by id
//@route           GET /api/task/id
//@access          Protected
const getTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

  try {
    const taskData = await Task.findOne({id:id});

    if(!taskData) return res.status(404).send({error:"Task not found"});

    res.status(200).json(taskData);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Update task by id
// @route   PUT /api/task/id
// @access  Protected
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    id,
    task
  )


  if (!updatedTask) {
    res.status(404);
    throw new Error("Task Not Found");
  } else {
    res.json(updatedTask);
  }
});

// @desc    Delete Task
// @route   DELETE /api/task/id
// @access  Protected
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const deleteTask = await Task.findByIdAndDelete(id);
  
  if(!deleteTask) return res.status(404).send({error:"Error Occurred while deleting the task"});

  res.send({message:"Task deleted successfully"});

  
});


module.exports = {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask
};
