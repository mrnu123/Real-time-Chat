const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/client", (req, res) => {
  res.sendFile(__dirname + "/client.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on port3000");
});
