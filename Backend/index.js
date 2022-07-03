const express = require("express");
const chats = require("./data"); 
const dotenv= require("dotenv");
const connectDB = require ("./config/db"); 
const userRoutes= require('./routes/userRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const chatRoutes= require('./routes/chatRoutes');
const messageRoutes= require('./routes/messageRoutes');
const path= require("path");
const app= express();
dotenv.config();
connectDB();

app.use(express.json()); // telling the fe to use the json


app.use('/api/user',userRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/message", messageRoutes);

//-------------------------------
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
//--------------------------------
app.use(notFound);
app.use(errorHandler);

const server=app.listen(process.env.PORT||3000,console.log("Server is up at port 3000"));

const io= require('socket.io')(server,{
    //pingtimeout -> the amount of time it will wait before being inactive
    pingTimeout:60000,
    //cors to neglet cross origin error
    cors:{
        origin:"http://localhost:3001", // the port on which FE is running
    },
})

io.on("connection",(socket)=>{
    console.log('connected to socket.io');

    //creating a new socket where fe will send some data and join our room
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");});

        //joining a chat room, the two user will join the same room
        socket.on("join chat", (room) => {
            socket.join(room);
            console.log("User Joined Room: " + room);
          });

        socket.on("typing", (room) => socket.in(room).emit("typing"));
        socket.on("stop typing", (room) => socket.in(room).emit("stop typing")); 
        
        //new message
        socket.on("new message", (newMessageRecieved) => {
            var chat = newMessageRecieved.chat;
        
            if (!chat.users) return console.log("chat.users not defined");
        
            // the message should be sent to only recievers in the grp
            chat.users.forEach((user) => {
              if (user._id == newMessageRecieved.sender._id) return;
        
              socket.in(user._id).emit("message recieved", newMessageRecieved); //in <- inside that message room
            });
          });
          socket.off("setup", () => {
            console.log("USER DISCONNECTED");
            socket.leave(userData._id);
          });

});