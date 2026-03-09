const Task = require("../models/Task");

exports.createTask = async (req, res) => {
    try {
        const { title, description, priority, assignedTo, dueDate } = req.body;
        const task = await Task.create({
            title,
            description,
            priority,
            assignedTo,
            dueDate,
        });
        return res.status(201).json({
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message });
    }
};

 exports.getTasks = async (req, res) => {
    try {
        let tasks;
        if (req.user.role === "admin") {
            tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email");
        }
        else {
            tasks = await
            Task.find({ assignedTo: req.user.id})
            .populate("assignedTo", "name email")
        .populate("createdBy", "name email");
        }
        res.json({
            success: true,
            tasks,

        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
 };

   exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedTask = await
        Task.findByIdAndUpdate(
            id,
            req.body,
            { new: true}
        );
        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        res.json({
            message: "Task updated successfully",
            task: updatedTask,
        });
    } catch (error) {
        res.status(500).json({
        error: error.message,
        });
    }
   };

    exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedTask = await
        Task.findByIdAndDelete(id);

        if (!Task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        res.json({
            message: "Task deleted successfully",
            task: updatedTask,
        });
    } catch (error) {
        res.status(500).json({
        error: error.message,
        });
    }
   };

    