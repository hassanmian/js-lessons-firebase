import React, {useState, useEffect} from 'react';
import firebase from "./firebase"

function App() {
  const [userList, setUserList] = useState(null)
  
  const database = firebase.database()
  const userRef = database.ref("users")
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
  }, [])
  
  function getUserList() {
    const url = "https://js-lessons-a0fc7.firebaseio.com/users.json"
    fetch(url)
    .then(res => res.json())
    .then(data => setUserList(data))
  }

  return (
    <div>
      <h1>Firebase</h1>
      {userList && userList.map(userItem => {
        return (
          <p key={userItem.id}>{userItem.name}</p>
        )
      })}
    </div>
  );
}

export default App;
