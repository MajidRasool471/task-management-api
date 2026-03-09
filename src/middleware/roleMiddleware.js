const checkAdmin = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "only admin"
        });
    }
     next();
};
 module.exports = checkAdmin;