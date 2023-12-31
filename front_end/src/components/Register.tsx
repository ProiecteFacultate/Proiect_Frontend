import React, { useState } from 'react';
import { firestore } from '../firebase';
import { addDoc, collection } from '@firebase/firestore'
import { Button, TextField } from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (event : any): void => {
    event.preventDefault();
    const ref = collection(firestore, "Users");

    let data = {
      username: username,
      password: password
    }

    try {
      addDoc(ref, data);
    }catch(e){
      alert("error");
    }
  }
  
    return (
      <>
        <p>Register</p>
        <form onSubmit={onSubmitHandler}>
          <TextField 
              label="Username"
              onChange={(event : any) => setUsername( () => event.target.value)}
              value={username}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{mb : 3}}
          />
           <TextField 
              label="Password"
              onChange={(event : any) => setPassword( () => event.target.value)}
              value={password}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{mb : 3}}
          />
          <Button variant="outlined" color="secondary" type="submit">Register</Button>
        </form>
      </>
    );
  }
  
  export default Register;