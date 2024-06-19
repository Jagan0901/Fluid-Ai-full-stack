const express = require("express");
const {
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/tasksController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createTask);
router.route("/").get(protect, getTasks);
router.route("/:id").get(protect, getTask);
router.route("/:id").put(protect, updateTask);
router.route("/:id").delete(protect, deleteTask);

const taskRouter = router;



module.exports = taskRouter;
