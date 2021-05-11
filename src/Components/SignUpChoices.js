import React from 'react';
import {Button, ThemeProvider, Typography,Grid} from '@material-ui/core';
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
   

    root:{
        margin:theme.spacing(1)
    },
    linkStyle: {
     color: '#fafafa',
     textDecoration: 'none',
        
    }
  }));


const SignUpChoices = ()=>{

    const classes = useStyles()

    return(
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
      
        <Grid item xs={3}>
            <Button variant ='contained' 
            className ={classes.root}
            color='primary'
            size = 'large'> <Link to='/signup/teacher' className = {classes.linkStyle}> Teacher </Link> </Button>

            <Button variant = 'contained'
            className = {classes.root} 
            color = 'secondary'
            size ='large'> <Link to ='/signup/student' className = {classes.linkStyle}> Student</Link></Button>
        </Grid>   
      
      </Grid>  

            
            
       
    )  
}

export default SignUpChoices