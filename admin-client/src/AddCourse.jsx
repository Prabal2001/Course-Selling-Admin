import React, { useState } from 'react'
import  TextField  from '@mui/material/TextField'
import Button  from '@mui/material/Button'
import Card from '@mui/material/Card'
const AddCourse = () => {
    const[title,setTitle] = useState("");
    const[description,setDescription] = useState("");
     const[image,setImage] = useState("");
  return (
    <div style ={{
        display:"flex",
        justifyContent:"center",
       }}>
          <Card variant="outlined" style={{width:"400", padding:"20"}}>
     <TextField  onChange={(e) =>{
               setTitle(e.target.value);
            }} label="Title"  variant="outlined" fullWidth="true" />
      <br /><br />
      <TextField  onChange={(e) =>{
        setDescription(e.target.value);
            
        }} label="Description"  variant="outlined" fullWidth="true" />
         <TextField  onChange={(e) =>{
        setImage(e.target.value);
            
        }} label="Image"  variant="outlined" fullWidth="true" />
         <Button size = {"large"} variant="contained" onClick ={() =>{

           function callback2(data) {
                 alert("Course Created")
                 }
          function callback1(res) {
           res.json().then(callback2)
               }
        fetch("http://localhost:3000/admin/courses",{
         method:"POST",
         body:JSON.stringify({
           title:title,
           description:description,
           imageLink:image,
           published:true
          }),
         headers:{
          "Content-type":"application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
         }
       }).then(callback1);
}}>Add Course</Button>
         </Card>
    </div>
  )
}

export default AddCourse;