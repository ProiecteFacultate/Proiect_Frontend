import React from 'react';
import './App.css';
import { firestore } from './firebase.js';
import { addDoc, collection } from '@firebase/firestore'

function App() {
  const ref = collection(firestore, "Users");
  const clickHandle = (event : any) => {
    let data = {
      username: "test2u",
      password: "test2p"
    }
    try {
      addDoc(ref, data);
    }catch(e){
      alert("error");
    }
  }

  return (
    <div className="App">
      <p>Hello</p>
      <button onClick={clickHandle}>Click</button>
    </div>
  );
}

export default App;
