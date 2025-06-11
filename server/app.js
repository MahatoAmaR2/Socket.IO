import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 3000;

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
}); // create circuit instance

app.use(cors());

app.get("/", (req, res) => {
  res.send("Har Har Mahadev");
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);
  // socket.emit("welcome",`Welcome to the server ${socket.id}`) // for me message
  // socket.broadcast.emit("welcome",`Welcome to the server ${socket.id}`) // for other message

  socket.on("message", ({room, message}) =>{
    console.log(room, message);
    io.to(room).emit("receive-message", message)
  })

  socket.on("join-room", (room) => {
    socket.join(room)
  })

  socket.on("disconnect", ()=>{
    console.log("User Disconnected", socket.id);
  })
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
