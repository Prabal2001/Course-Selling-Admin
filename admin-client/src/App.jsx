
import AppBar  from './Appbar';
import './App.css'
import Signup from './Signup'
import Signin from './Signin';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import AddCourse from './AddCourse';
import  Card  from '@mui/material/Card';
import Courses from './Courses';
import Course from './Course';
import Landing from './Landing';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { userState } from './store/atoms/user';
import axios from 'axios';
function App() {
  return (
        <RecoilRoot>
            <div>
      <Router>
        
        <AppBar />
        <InitUser />
       <Routes>
       <Route path='/addcourse' element = {<AddCourse />}></Route>
       <Route path="/courses" element={<Courses />}></Route>
       <Route path="/course/:courseId" element = {<Course / >}></Route>
        <Route path="/login" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/" element={<Landing />}></Route>
       </Routes>
      </Router>
      </div>
      </RecoilRoot>
    
  )
}

function InitUser() {
         const setUser = useSetRecoilState(userState);
           
         const init = async() =>{
                 try {
               const response = await axios.get("http://localhost:3000/admin/me",{
                headers:{
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
               })
                  if(response.data.username) {
                    setUser({
                      isLoading:false,
                      userEmail:response.data.username
                    })
                  }
                  else {
                    setUser({
                      isLoading:false,
                      userEmail:null
                    })
                  }
                }
              
        catch(e) 
        {
             setUser({
              isLoading:false,
              userEmail:null
             })
            }
          }
        }
export default App;
