import React, {useState, useEffect} from 'react';
import firebase from "./firebase"

function App() {
  const [userList, setUserList] = useState(null)
  const [messageList, setMessageList] = useState(null)
  const [currentMessage, setCurrentMessage] = useState("")
  
  const database = firebase.database()
  const userRef = database.ref("users")
  const chatRef = database.ref("chat")
  /*
  Struktur på funktioner/variabler i komponenter:
  1. props
  2. state variabler
  3. useEffects
  4. Event Handlers
  5. Andra funktioner
  */ 
  useEffect(() => {
    // getUserList()
    userRef.on('value', snapshot => {
      setUserList(snapshot.val())
    })

    chatRef.on('value', snapshot => {
      setMessageList(snapshot.val())
    })
  }, [])

  function handleChatPost(e) {
    e.preventDefault()
    chatRef.push({
      username: 'Hassan',
      message: currentMessage
    }, function(error) {
      if(error) {
        console.log("failed")
      } else {
        setCurrentMessage("")
      }
    })
  }

  return (
    <div>
      <h1>Firebase</h1>
      {userList && userList.map(userItem => {
        return (
          <p key={userItem.id}>{userItem.name}</p>
        )
      })}
      
      <div>
        <h3>My Chat</h3>
        <form onSubmit={handleChatPost}>
          <input type="text" value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} />
          <button type="submit">Send Message</button>
        </form>
        <div>
          {messageList && Object.entries(messageList).reverse().map(messageArr => {
            const key = messageArr[0]
            const messageItem = messageArr[1]
            return (
              <p key={key}>{messageItem.username} says: "{messageItem.message}"</p>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
