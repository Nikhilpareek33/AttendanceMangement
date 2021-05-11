import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Cookie from 'universal-cookie'
import axios from 'axios'
import { Redirect } from 'react-router';
import DeployLink from '../Utility/DeployLink';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({logInStatus,
                                setLogInStatus}) {

  console.log("this is th current status "  + logInStatus);

  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [error,setError] = useState("");
  const [message,setMessage] = useState("");

  const classes = useStyles();

  let errorJSX = (
    <div> </div>
  );

  const cookies = new Cookie();

  const handleSigIn = (e)=>{

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
        email : email,
        password : password,
      }

      console.log("this is the details that are posted" + details);
      
      console.log("link " + DeployLink('/signin'));

      // axios.get(DeployLink('/signin')).then((response)=>{

      //   console.log((response.data));
      // })
      // .catch((err)=>{
      //     console.log(err);
      //     setError(err.response);
      //   });

      axios.post(DeployLink('/signin'),details)
      .then((response)=>{
          
          console.log("this is the reponse" +  response.data.sessionID);    
          
          let sessiondata = response.data.sessionID

          cookies.set("sessionID", sessiondata , {path: "/",maxAge:60*60*1000});
          
          setLogInStatus(true);
          setError("");
          setMessage(response.data.sessionID);
         
          console.log('@@@ ' + logInStatus );
          

         
      })
      .catch((err)=>{
        console.log(err);
        setError(err.response);
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

  if(logInStatus)
  {
    return <Redirect  to = '/' />
  }

  else
  {
    return (
      <Container component="main" maxWidth="xs" className ={classes.contianerstyle}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {e => {setemail(e.target.value) }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {e =>{setpassword(e.target.value)}}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {handleSigIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup/student" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
       {errorJSX}
      </Container>
    );
  }
  
}
