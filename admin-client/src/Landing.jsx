import { Grid,Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import {  useRecoilValue } from "recoil";
import { userEmailState } from "./store/selectors/userEmail";
import { isUserLoading } from "./store/selectors/isUserLoading";

 const Landing = () =>{
   const navigate = useNavigate();
     const userEmail = useRecoilValue(userEmailState);
     const userLoading = useRecoilValue(isUserLoading);
     return (
     <div>
      <Grid container style = {{padding:"5vw"}}>
        <Grid item  xs={12} lg={6} md={12}></Grid>
        <div style={{marginTop:100}}>
          <Typography variant={"h2"}>
            Coursera Admin
          </Typography>
          <Typography variant={"h5"}>
            A place to learn and grow
          </Typography>
          {!userLoading && !userEmail && <div style={{display:"flex",marginTop:10}}>
            <div style={{marginRight:10}}>
              <Button variant={"contained"} size={"large"} onClick={() =>{
                 navigate("/signup");
              }}>Signup</Button>
            </div>
           <div>
          <Button variant={"contained"} size={"large"} onClick={() =>{
                 navigate("/login");
              }}>Login</Button>
        </div>
        </div> }
        </div>
      </Grid>
     </div>
     )
}

export default Landing;