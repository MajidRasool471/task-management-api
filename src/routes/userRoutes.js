const verifyToken = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const {
    createUser,
    getUsers,
    updateUser,
} = require("../controllers/userController");

 router.post("/users", createUser);
 router.get("/users", verifyToken,  getUsers);
 router.put("/users/:id", updateUser);

 module.exports = router;