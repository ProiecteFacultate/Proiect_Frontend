import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../css/Register.css'
import { firestore } from '../firebase';
import { addDoc, collection, query, where, getDocs } from '@firebase/firestore'
import { Button, TextField, Alert, AlertColor } from '@mui/material';
import AuthNavbar from './AuthNavbar.tsx';

function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertColor>("success");
  const [alertMessage, setAlertMessage] = useState("");

  const onSubmitHandler = (event : any): void => {
    event.preventDefault();
    const usersCollectionRef = collection(firestore, "Users");
    const profilesCollectionRef = collection(firestore, "Profiles");

    const tag = uuidv4();
    let usersCollectionData = {
      tag: tag,
      email: email.trim(),
      username: username.trim(),
      password: password,
    };

    let profilesCollectionData = {
      tag: tag,
      username: username,
      description: "Default description"
    };

    try {
      const q = query(usersCollectionRef, where("username", "==", username));
      getDocs(q).then((qSnap) => { 
        if(qSnap.empty === true) {
          addDoc(usersCollectionRef, usersCollectionData);
          addDoc(profilesCollectionRef, profilesCollectionData);
          setAlertType(() => "success");    
          setAlertMessage(() => "Account successfully created!")  
        }
        else {
          setAlertType(() => "error");
          setAlertMessage(() => "Username " + username + " is already used!");  
        }

        setAlertVisible(() => true);
      })
    }catch(e){
      alert("Error while trying to register");
    }
  }
  
    return (
      <>
        <AuthNavbar data={{navBarTitle: "Register Page"}}></AuthNavbar>
        <form onSubmit={onSubmitHandler} className='registerForm'>
        <TextField className='registerFormTextField'
              label="Email"
              onChange={(event : any) => setEmail( () => event.target.value)}
              value={email}
              required
              variant="outlined"
              color="secondary"
              type="email"
              sx={{mb : 3}}
          />
          <TextField className='registerFormTextField'
              label="Username"
              onChange={(event : any) => setUsername( () => event.target.value)}
              value={username}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{mb : 3}}
          />
           <TextField className='registerFormTextField'
              label="Password"
              onChange={(event : any) => setPassword( () => event.target.value)}
              value={password}
              required
              variant="outlined"
              color="secondary"
              type="password"
              sx={{mb : 3}}
          />
          <Button variant="outlined" color="secondary" type="submit" className="registerButton">Register</Button>

          { alertVisible && 
            <Alert severity={alertType} className='registerAlert'>{alertMessage}</Alert>
          }
        </form>
      </>
    );
}
  
export default Register;