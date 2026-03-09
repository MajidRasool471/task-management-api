const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

exports.signup = async (req, res) => {
    try { 
        const { name, email, password, role} = req.body;

        const userExists = await
        User.findOne({ email});
        if (userExists) {
            return res.status(400).json({ message: "User already exists"});
        }
          const hashedPassword = await
          bcrypt.hash(password, 10);

          const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
          });
          res.status(201).json({
            message: "Signup successful",
            user,
          });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await
        User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found"});
        }

         const isMatch = await 
         bcrypt.compare(password, user.password);
         if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password"});
         }

         const token = jwt.sign({
            id: user._id, role: user.role },
              "secretkey",
            { expiresIn: "1d"}
        );
        res.json({
            message: "Login sucessful",
            token,
            user: {
                _id: user._id,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};
  exports.forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
     const user = await
     User.findOne({email});

     if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
     }
        res.status(200).json({
            message: "Email verified, you can reset password",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
  };
    
    exports.resetPassword = async (req, res) => {
    const {email, password} = req.body;
    try {
     const user = await
     User.findOne({email});
     if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
     }
     const hashedPassword = await 
     bcrypt.hash(password, 10);
     user.password = hashedPassword;
     await user.save();

       res.json({
        message: "Password reset successfull"
       });

    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
  };