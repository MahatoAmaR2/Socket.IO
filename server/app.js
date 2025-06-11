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
  console.log("User Connected");

  console.log("ID", socket.id);
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
