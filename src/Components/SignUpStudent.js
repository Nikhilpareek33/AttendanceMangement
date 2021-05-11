import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignUpChoices from '../Components/SignUpChoices'
import axios from 'axios'
import DeployLink from '../Utility/DeployLink';


// custom styles using material ui
const useStyles = makeStyles((theme) => ({
  
  contianerstyle:{
    boxShadow: ' 3px 0px 20px 1px rgba(39,39,50,0.64)'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


// SignUp function starts
export default function SignUpStudent() {
  
  const classes = useStyles();

  const [firstname,setfirstname] = useState("");
  const [lastname,setlastname] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [fatherfirstname,setfatherfirstname] = useState("");
  const [fatherlastname,setfatherlastname] = useState("");
  const [mobilenumber,setmobilenumber] = useState("");
  const [classnumber ,setclass] = useState("");
  const [error,setError] = useState("");
  const [message,setMessage] = useState("");

  let errorJSX = (
    <div> </div>
  );


  const signUp = (e)=>{

    e.preventDefault();
      // let passLength = password.length;
      // if(password === "" || email ==="" || firstname===""){
      //     setError("Please enter all the fields");
      //     return;
      // }
      // if(passLength<6){
      //     setError("Please choose a valid Password!");
      //     return;
      // }
      // if(password){
      //     setError("Entered incorrect Confirm Password!");
      //     return;
      // }
      let details = {
        firstname : firstname,
        lastname : lastname,
        email : email,
        password : password,
        fatherfirstname : fatherfirstname,
        fatherlastname : fatherlastname,
        mobilenumber : mobilenumber,
        classnumber : classnumber
      }

      console.log(details);

      const link = "/signup/student";

      axios.post(DeployLink(link) ,details).then((response)=>{
          console.log(response.data);    
          setError("");
          setMessage(response.data);
      })
      .catch((err)=>{

        setError(err.response.data);
      });
  
  }

  if(error !== "")
  {
    errorJSX = (
      <div >
          <div >There was a problem!</div>
          <p>
              {error}
          </p>
      </div>
    )
  }
  
  if(message !== "")
  {
    errorJSX = (
      <div >
          <div >There was a message</div>
          <p>
              {message}
          </p>
         
      </div>
    )
  }


  return (
    <>
    <SignUpChoices/>

    <Container component="main" maxWidth="xs" className={classes.contianerstyle}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
        Sign up (Student)
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
                onChange = {e =>{ setfirstname(e.target.value) }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="lname"
                onChange = {e =>{ setlastname(e.target.value) }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange = {e =>{ setemail(e.target.value) }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {e =>{ setpassword(e.target.value) }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fatherfirstname"
                label="Father's First Name"
                name="fatherfirstname"
                autoComplete="lname"
                onChange = {e =>{ setfatherfirstname(e.target.value) }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fatherlastname"
                label="Father's Last Name"
                name="fatherlastname"
                autoComplete="lname"
                onChange = {e =>{ setfatherlastname(e.target.value) }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mobilenumber"
                label="Mobile Number"
                name="mobilenumber"
                onChange = {e =>{ setmobilenumber(e.target.value) }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="classnumber"
                label="Class (Number)"
                name="classnumber"
                onChange = {e =>{ setclass(e.target.value) }}
              />
            </Grid>
           
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}

            onClick = {signUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
  
      
      {errorJSX}

    </>
  );
}