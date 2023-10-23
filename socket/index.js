import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.SERVER_PORT;

const io = new Server({ cors: "http://localhost:5173/" });

let onlineUsers = [];
io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("addNewUser", (userId) => {
    console.log(userId);
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    console.log("onlineUsers", onlineUsers);
    // io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (message) => {
    console.log(message);
    const user = onlineUsers.find((user) => user.userId === message.recieverId);
    console.log(user);
    if (user) {
      console.log(user.socketId);
      io.to(user.socketId).emit("getMessage", {
        content: message.content,
        senderId: message.senderId,
      });
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${PORT}`);
});
