const User = require("../models/User");

exports.createUser = async (req, res) => {
    try {
        const user = await
        User.create(req.body);

        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            messages: error.message,
        });
    }
};

 exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("_id name");

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
 };

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.paramas.id,
            req.body,
            {new: true}
        );
        res.status(200).json({
            success: true,
            data: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};