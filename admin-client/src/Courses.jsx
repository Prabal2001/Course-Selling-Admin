import React, { useState,useEffect } from 'react'
import Card from '@mui/material/Card';
import  Typography  from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Courses = () => {
    const[courses,setCourses] = useState([]);
    
      useEffect(() =>{
         function callback2(data) {
           setCourses(data.courses);
         }
        function callback1(res){
             res.json().then(callback2);
        }
        fetch("http://localhost:3000/admin/courses",{
             method:"GET",
            headers: {
              
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(callback1);
      },[])
 return (
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
       {courses.map(course =>{
           return (
           <Course course = {course} />
           )
       })}
    </div>
  )
}
 export function Course({course}) {
     const navigate = useNavigate();
    return <Card style ={{
       margin:10,
        width:300,
         minHeight:200} } >
          
      <Typography variant={"h4"} textAlign={'center'}> {course.title}</Typography>
       <Typography variant = {"h4"} textAlign={'center'}>{course.description}</Typography>
        <img src={course.imageLink} style={{width:300}}></img>
        <div style={{display:'flex',justifyContent:"center",marginTop:20}}>
          <Button variant='contained' size="large" onClick={() =>{
                  navigate("/course/" +course._id);
          }} >Edit Course </Button>
        </div>
    </Card>
    
}

export default Courses;