const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")
const server = http.createServer(app)
app.use(cors())

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  console.log(socket.id, "Socket Id Connect")
  socket.on("join_room",(data)=>{
    console.log(data)
    socket.join(data)
    console.log(`User Scoket Id: ${socket.id} joined room ${data}`)
  })
  socket.on("send_message",(data)=>{
    console.log(data,"message data")
    socket.to(data.room).emit("recieve_message",data)
  })
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id)
  })
})
server.listen(3001, () => {
  console.log("server running")
})
