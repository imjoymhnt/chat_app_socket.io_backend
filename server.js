const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {
    origin: "*",
  }})

  dotenv.config()

  const userRoute = require("./routes/user")


// connecting to Database 
  mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });


io.on('connection', (socket) => {
    console.log("socket is active to be connected");

    socket.on("chat", (payload) => {
        io.emit("chat", payload)
    })
})

app.use(express.json());

app.use("/api", userRoute)

server.listen(5000, () => {
    console.log("Server is running on port 5000...")
})