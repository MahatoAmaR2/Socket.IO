# 📡 Learn Socket.IO for Real-time Chat

![Socket.IO](https://img.shields.io/badge/socket.io-v4.0+-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🚀 Introduction

WebSockets are a protocol that enables real-time, two-way communication between a client (like a browser) and a server. They are commonly used in applications such as real-time chat, multiplayer games, and live notifications.

This project is a beginner-friendly guide to understanding and using **Socket.IO**, a library that simplifies WebSocket communication in Node.js environments.

---

## 🧠 Important Keywords

Here are some key methods and concepts in Socket.IO:

| Keyword   | Description                                      |
|-----------|--------------------------------------------------|
| `emit`    | Used to **send** an event with data.             |
| `on`      | Used to **listen** for an event and receive data.|
| `broadcast` | Sends an event to **all clients** except the sender. |
| `to(room)`| Sends an event to **a specific room**.           |
| `join(room)` | Adds the client to a **room**, allowing room-based messaging. |

---

## 📥 Installation

### 🔧 Server-side (Node.js)

Install Socket.IO for the backend using npm:

```bash
npm install socket.io
