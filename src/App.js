import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);


  const joinRoom = () => {
    if ((username !== "") & (room !== "")) {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">

      {
        !showChat ?
      (
      <div className="joinChatContainer">
        <h3>Welcome</h3>

        <input
          type="text"
          placeholder="Key-in Your Name"
          onChange={(events) => {
            setUsername(events.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Key-in Room ID"
          onChange={(events) => {
            setRoom(events.target.value);
          }}
        />
        <button onClick={joinRoom}> Join the Chat room </button>
        </div>)
:
(        <Chat  socket={socket} username={username} room={room} />)
        }
        </div>

  );
}

export default App;
