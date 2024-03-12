import React, { useEffect, useState } from 'react'
import "./app.css"
import ScrollToBottom from "react-scroll-to-bottom"

function Chat({ room, socket, userName }) {
  const [currentMessage, setCurrentMessage] = useState()
  const [messageList, setMessageList] = useState([])

  const sendMessage = async () => {
    console.log(currentMessage, "currentMessage")
    if (currentMessage !== "") {
      const messgaeData = {
        room: room,
        author: userName,
        messgae: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }
      await socket.emit("send_message", messgaeData)
      setMessageList((previous) => [...previous, messgaeData])
      setCurrentMessage("")
    }
  }

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList((previous) => [...previous, data])
    })
  }, [socket])
  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
          {messageList?.map((message) => {
            console.log(message, "messageList")
            return <div className="message" key={message?.message} id={userName === message?.author ? "you" : "other"}>
              <div>
                <div className='message-content'>
                  <p>{message?.messgae}</p>
                </div>
                <div className='message-meta'>
                  <p className='time'>{message?.time}</p>
                  <p className='authoe'>{message?.author}</p>
                </div>
              </div>
            </div>
          })}
        </ScrollToBottom>

      </div>
      <div className='chat-footer'>
        <input placeholder='message....' value={currentMessage} onChange={(event) => setCurrentMessage(event.target.value)}>
        </input>
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat