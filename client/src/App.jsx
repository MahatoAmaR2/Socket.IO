import React from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useMemo } from "react";

const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socketid, setSocketid] = useState("");
  const [room, setRoom] = useState("");
  const [roomName, setRoomName] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage(" ");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault()
    socket.emit("join-room", roomName)
    setRoomName("")
  }

  useEffect(() => {
    socket.on("connect", () => {
      setSocketid(socket.id);
      console.log("CLient 1", socket.id);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    socket.on("receive-message", (data) => {
      console.log(data);

      setMessages((messages) => [...messages, data]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <Container maxWidth="sm">
      <Box sx={{ height: 180 }} />
      <Typography variant="h6" component="div">
        {socketid}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
         <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>
      </form>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>

      <Stack>
        {messages.map((m, i) => (
          <Typography key={i} variant="h6" component="div" gutterBottom>
            {m}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default App;
