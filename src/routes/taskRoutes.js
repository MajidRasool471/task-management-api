const express = require("express");
const router = express.Router(); 

const verifyToken = require("../middleware/authMiddleware");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const checkAdmin = require("../middleware/roleMiddleware");

router.post("/tasks", verifyToken, checkAdmin, createTask);
router.get("/tasks", verifyToken, getTasks);
router.put("/tasks/:id", verifyToken, updateTask);
router.delete("/tasks/:id", verifyToken, checkAdmin, deleteTask)
module.exports = router;