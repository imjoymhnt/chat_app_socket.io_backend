const User = require("../models/user")
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
var jwt = require('jsonwebtoken');


// ################################### User Signup ################################### 🚀🚀
exports.userSignup = (req, res) => {
    const {userId, email, password} = req.body
    try{
        const salt = uuidv4()
        const encry_password = crypto.createHmac("sha256", salt).update(password).digest('hex')

        const user = new User({userId, email, password: encry_password, salt})
        user.save((err, userData) => {
            if(err || !userData) {
                return res.status(400).json({
                    success: false,
                    msg: "Can't save user!"
                })
            }
            return res.status(201).json({
                success: true,
                data: userData
            })
        })
    } catch(err) {
        return res.status(400).json({
            success: false,
            msg: "user not found"
          })
    }
}

// ################################### User Signin ##################################### 🚀🚀
exports.userSignin = (req, res) => {
    const {email, password} = req.body
    // console.log(req.body);
    User.findOne({email}).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                success: false,
                msg: "No user found"
            })
        }
        // console.log(user);
        console.log(user.salt);
        const salt = user.salt
        const encry_password = crypto.createHmac("sha256", salt).update(password).digest('hex')
        if(encry_password === user.password) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

            const { _id, email, userId } = user;

      res.status(200).json({
        success: true,
        token,
        user: { _id, email, userId },
      });
        } else {
            return res.status(400).json({
                success: false,
                msg: "Password or userid not matched!"
            })
        }
    })
}