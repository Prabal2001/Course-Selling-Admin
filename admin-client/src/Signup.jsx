import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
 import {useState} from 'react';  
 import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from './store/atoms/user';
const Signup = () => {
  const[email,setEmail] = useState();
  const[password,setPassword] = useState();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  return (
   <div>
            <div style = {{
              paddingTop:"150",
                marginBottom:10,
                  display:"flex",
                justifyContent:"center"}}
                >
            <Typography variant = {"h4"} style={{textAlign:"center"}}>
                   Signup Please
        </Typography>
        </div>
    <div style = {{
      display:"flex",
      justifyContent:"center"}}>
    <Card variant="outlined" style={{width:"400px", padding:"20px", marginTop:"150px"}}>
    <TextField  onChange={(e) =>{
       setEmail(e.target.value);
    }} label="Email"  variant="outlined" fullWidth="true" />
      <br /><br />
      <TextField  onChange={(e) =>{
        setPassword(e.target.value);
      }}  label="Password"  variant="outlined" fullWidth="true" type ={"password"}/>
     <br /><br />
       
     <Button  id="outlined" size = {"large"} variant="contained" onClick={async() =>{ 
              // function callback1(response) {
              //    let data = response.data;
              //    localStorage.setItem("token",data.token);
              //    window.location = "/";
              // }
              const response = await axios.post("http://localhost:3000/admin/signup",{
                  username:email,
                  password:password
              })
               let data = response.data;
               localStorage.setItem("token",data.token);
               setUser({userEmail: email, isLoading: false})
               navigate("/courses")
                  
     }}>Signup </Button>
     </Card>
    </div>
    </div>
  )
}

export default Signup;