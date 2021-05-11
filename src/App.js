import React, { useEffect, useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import SignUpStudent from './Components/SignUpStudent'
import SignUpTeacher from './Components/SignUpTeacher'
import Cookie from 'universal-cookie'
import axios from 'axios';
import home from './Components/home';
import Profile from './Components/Profile'
import SignIn from './Components/SignIn';
import DeployLink from './Utility/DeployLink'

function App() {

  const [logInStatus, setLogInStatus] = useState(false);
  const [details, setDetails] = useState({
    firstName : "a",
    lastName : "b",
    classnumber: "10",
    type : "2" 
  });

  const cookies = new Cookie();

  const login =(sessionID , firstname, lastname , classnumber,type)=>{

    cookies.set("sessionID", sessionID , {path: "/",maxAge:60*60*1000});

    console.log("While setting details " + firstname);
    setDetails({
      firstName : firstname,
      lastName : " ",
      classnumber: " ",
      type : " " 
    })

    setLogInStatus(true)
  }

  const logout = (deleteCookie)=>{

    console.log("loggin out");
    
    if(deleteCookie){
      cookies.remove("sessionID");
    }

    setLogInStatus(false);
  }

  const checkSession =async ()=>{
    const link = "/signup/checksession";
    await axios.post(DeployLink(link),
    { sessionID: cookies.get("sessionID")})
    .then(response =>{

      console.log("Response changes here " + response.data.firstname + " "+ response.data.classnumber  );
      if(response.data.status){
        
       
        login(cookies.get("sessionID"), response.data.firstname,
              response.data.lastname,response.data.classnumber,
              response.data.type);
      } else{

        logout(true);
      }
    } ).catch(err =>{

      console.log("unable to send checkSession cause of error: " + err);
      logout(false);
    })
  }


  useEffect( ()=>{

    let session = cookies.get("sessionID")

    if(session === undefined || logInStatus == true)
    {
      console.log("Redirecting because session is present " + session + " calling redirect fucntion");
      return;
    }

    else
    {
      console.log("checking session authenticity");
      checkSession();
    }
  })

  
  
  return (
    <Router>
      <NavBar logInStatus ={ logInStatus}/>
        <Switch>
            <Route exact path="/" component = {home} />
            <Route exact path='/signin' >
              <SignIn logInStatus ={logInStatus} 
                      setLogInStatus = {setLogInStatus} 
                     />
            </Route>
            <Route exact path = '/signup/teacher' component={SignUpTeacher}/>
            <Route exact path = '/signup/student' component={SignUpStudent}/>
            <Route exact path = '/profile' >
              <Profile details = {details} />
            </Route>
        </Switch>
    </Router>
  );
}



export default App;
