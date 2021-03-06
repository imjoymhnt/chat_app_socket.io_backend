const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        required: true,
        type: String,
      },
      salt: {
        type: String,
      }
})

module.exports = mongoose.model("User", userSchema)