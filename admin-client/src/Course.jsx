import React from 'react'
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import  Card from '@mui/material/Card';
import  Typography from '@mui/material/Typography';
import Button  from '@mui/material/Button';
 import  TextField from '@mui/material/TextField';
import  Grid  from '@mui/material/Grid';
 import axios from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { courseState } from './store/atoms/course';
import { courseDescription, courseImage, courseTitle, isCourseLoading} from './store/selectors/course';
import { Loading } from './Loading';

const Course = () => {

    let { courseId } = useParams();
     const setCourse = useSetRecoilState(courseState);
      const courseLoading = useRecoilValue(isCourseLoading);
      useEffect(() =>{
        axios.get("http://localhost:3000/admin/course/" + courseId , {
            method:"GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setCourse({isLoading:false,
              course:res.data.course})
        })
        .catch(e =>{
          setCourse({isLoading:false,
            course:null})
        })
      },[]);
       
           if(courseLoading){
             return <>
             <Loading /></>
           }
            return (
              <div>
                <GrayTopper></GrayTopper>
                 <Grid container>
                  <Grid item lg={8} md={12} sm={12}>
                    <UpdateCard ></UpdateCard>
                    </Grid>
                     <Grid item lg={4} md={12} sm={12}>
                      <CourseCard></CourseCard>
                  </Grid>
                 </Grid>
              </div>
            )
            }



         function GrayTopper() {
                  const title = useRecoilValue(courseTitle);
                  return <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
                  <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column"}}>
                      <div>
                          <Typography style={{color: "white", fontWeight: 600}} variant="h3" textAlign={"center"}>
                              {title}
                          </Typography>
                      </div>
                  </div>
              </div>
          }
 
  function UpdateCard() {
     const[courseDetails,setCourse] = useRecoilState(courseState);
    const[title,setTitle] = useState(courseDetails.course.title);
    const[description,setDescription] = useState(courseDetails.course.description);
     const[image,setImage] = useState(courseDetails.course.imageLink);
  return (
    <div style ={{
        display:"flex",
        justifyContent:"center",
       }}>
          <Card variant="outlined" style={{width:"400", padding:"20"}}>
            <div style={{padding:20}}>
     <TextField  value={title} onChange={(e) =>{
               setTitle(e.target.value);
            }} label="Title"  variant="outlined" fullWidth="true" />
      <br /><br />
      <TextField value = {description} onChange={(e) =>{
        setDescription(e.target.value);
            
        }} label="Description"  variant="outlined" fullWidth="true" />
         <TextField  value={image} onChange={(e) =>{
        setImage(e.target.value);
            
        }} label="Image"  variant="outlined" fullWidth="true" />
         <Button size = {"large"} variant="contained" onClick ={async() =>{
              axios.put("http://localhost:3000/admin/courses/" + courseDetails.course._id,{
                 title:title,
                 description:description,
                 imageLink:image,
                 published:true
         } ,
         {
           headers: {
            "Content-type":"application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`
           }
         });
         let updatedCourse = {
           _id:courseDetails.course._id,
           title:title,
           description:description,
           imageLink:image
         };
          setCourse({course:updatedCourse,isLoading:false});
        }}
          > Update Course</Button>
          </div>
         </Card>
    </div>
  )}


  function CourseCard(props) {
        const title = useRecoilValue(courseTitle);
        const imageLink = useRecoilValue(courseImage);
        const description = useRecoilValue(courseDescription);
          return(
            <div style={{display:"flex",justifyContent:"center",marginTop:50,width:"100%"}}>
        <Card style ={{
       margin:10,
        width:300,
         minHeight:200,
         borderRadius:20,
         paddingBottom:10,
         zIndex:2} } >
            <div style={{marginLeft:10}}>
            <img src={imageLink} style={{width:300}}></img>
      <Typography variant={"h4"} textAlign={'center'}> {title}</Typography>
      <Typography variant={"h4"} textAlign={'center'}> {description}</Typography>
              </div>
       </Card>
        </div>
            )
  }

export default Course;