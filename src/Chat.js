import React from "react";
import { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";


import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import { useCallback } from "react";


function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        sender: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect((list) => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log("inside use effect");
    });
  }, [socket]);

  return (
    <div className="chat-window">
      {/* <div className="chat-header">
        <p>You arein Chat Room </p>
      </div> */}
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.sender ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p id="inner"  >  </p>
                    <p id="author">{messageContent.sender}</p>

                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Key-in a message"
          onChange={(events) => setCurrentMessage(events.target.value)}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />

<Stack spacing={2} direction="row">
      <Button variant="contained" onClick={sendMessage}>Send</Button>

      </Stack>
        {/* <button style={{backgroundColor:"blue"}} onClick={sendMessage}>Send</button> */}
      </div>
    </div>
  );
}

export default Chat;
