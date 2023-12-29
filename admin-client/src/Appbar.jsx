import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
 import Button  from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from './store/atoms/user';
import { isUserLoading } from './store/selectors/isUserLoading';
import { userEmailState } from './store/selectors/userEmail';

const Appbar = () => {
      const navigate = useNavigate();
       const userLoading = useRecoilValue(isUserLoading);
       const userEmail = useRecoilValue(userEmailState);
       const setUser = useSetRecoilState(userState);

         if(userLoading) {
          return(
            <></>
          )
         }
        if(userEmail) {
         return (
            
            <div style ={{
               display:"flex",
               justifyContent:"space-between",
               padding:4,
               zIndex:1
            }}>
              <div style={{marginLeft:10,cursor:"pointer"}} onClick={()=>{
                   navigate("/");
              }}>
              <Typography variant='h4'>Coursera</Typography>
              </div>
              <div style={{display:"flex"}}>
                <div style={{marginRight:10,display:"flex"}}>
                  <div style={{marginRight:10}}>
                    <Button onClick={() =>{
                       navigate("/addcourse");
                    }}>Add Course</Button>
                  </div>
              
              <div style={{marginRight:"10"}}>
                <Button onClick={() =>{
                    navigate("/courses")
                }} >Courses</Button>
            
               <Button variant='contained' onClick={() =>{
                     localStorage.setItem("token",null);
                     setUser({
                      isLoading: false,
                      userEmail: null
                  })
                   }}>Logout</Button>
                 </div>
               </div>
            </div>
            </div>
          )
        }


           else {
 return (
    <div style ={{
       display:"flex",
       justifyContent:"space-between"
    }}>
      <div style={{display:"flex"}}>
      <Typography variant='h4'>Coursera</Typography>
      </div>
      <div style={{marginRight:"10px"}}>
       <Button variant='contained' onClick={() =>{
               navigate("/signup");
           }}>Signup</Button>
       <Button variant="contained" onClick={() =>{
                navigate("/login");
       }}>Login</Button>
       </div>
    </div>
  )
}
}
export default Appbar;
