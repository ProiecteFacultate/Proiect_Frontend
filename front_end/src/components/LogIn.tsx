import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/LogIn.css'
import { firestore } from '../firebase';
import { collection, query, where, getDocs } from '@firebase/firestore'
import { Button, TextField, Alert } from '@mui/material';
import AuthNavbar from './AuthNavbar.tsx';
import { useDispatch } from 'react-redux';
import { logInUser } from '../store/actions/action.ts';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {   //in case we came on /authentication/login after using log out button
    let loginPayload = {
      isAuthenticated: false,
      username: ''
  }
    dispatch(logInUser(loginPayload));
  })

  const onSubmitHandler = (event : any): void => {
    event.preventDefault();
    const usersCollectionRef = collection(firestore, "Users");

    try {
      const q = query(usersCollectionRef, where("username", "==", username));
      getDocs(q).then((qSnap) => { 
        if(qSnap.empty === true) {
            setAlertVisible(() => true);
            setAlertMessage(() => "No account with username " + username + " found!")  ;
        }
        else {
            const foundPassword = qSnap.docs[0].data().password;
            if(foundPassword !== password) {
                setAlertVisible(() => true);
                setAlertMessage(() => "Wrong password");
            }
            else {
                setAlertVisible(() => false);
                let loginPayload = {
                    isAuthenticated: true,
                    username: qSnap.docs[0].data().username
                }
                dispatch(logInUser(loginPayload));
                navigate('/home');
            }
        }
      })
    }catch(e){
      alert("Error while trying to log in");
    }
  }
  
    return (
      <>
        <AuthNavbar data={{navBarTitle: "LogIn Page"}}></AuthNavbar>
        <form onSubmit={onSubmitHandler} className='logInForm'>
          <TextField className='textField'
              label="Username"
              onChange={(event : any) => setUsername( () => event.target.value)}
              value={username}
              required
              variant="outlined"
              color="secondary"
              type="text"
              sx={{mb : 3}}
          />
           <TextField className='textField'
              label="Password"
              onChange={(event : any) => setPassword( () => event.target.value)}
              value={password}
              required
              variant="outlined"
              color="secondary"
              type="password"
              sx={{mb : 3}}
          />
          <Button variant="outlined" color="secondary" type="submit" className="logInButton">Log In</Button>

          { alertVisible && 
             <Alert severity="error" className='logInAlert'>{alertMessage}</Alert>
          }
        </form>
      </>
    );
}
  
export default Register;