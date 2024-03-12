import io from 'socket.io-client'
import React, { useState } from "react"
import Chat from './chats'
import "./app.css"

const socket = io.connect("http://localhost:3001")

function App() {
  const [userName, setUserName] = React.useState("")
  const [room, setRoom] = React.useState("")
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      console.log(room, userName)
      socket.emit("join_room", room)
      setShowChat(true)
    }
  }
  return (
    <div className="App">
      {
        !showChat ? <div className='joinChatContainer'>
          <h1>Join Chat</h1>
          <input placeholder="John..." onChange={(event) => setUserName(event.target.value)}></input>
          <input placeholder="Room Id" onChange={(event) => setRoom(event.target.value)}></input>
          <button onClick={joinRoom}>Join Room </button>
        </div> : <Chat socket={socket} userName={userName} room={room} />
      }
    </div>
  )
}

export default App
