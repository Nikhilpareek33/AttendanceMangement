import React from 'react'

import {AppBar , Typography, Toolbar,Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import {Link} from "react-router-dom"

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },

    linkStyle: {
     color: '#fafafa',
     textDecoration: 'none',
        
    }
  });
  


const NavBar = ({logInStatus}) =>{

    const classes = useStyles()

    const options = () =>{
        

        if(logInStatus)
        {
            return(
                <>
                <Button color="inherit">
                    <Link to ='/'  className={classes.linkStyle}>
                        Sign Out
                    </Link>
                </Button>

                <Button color="inherit">
                <Link to ='/profile'  className={classes.linkStyle}>
                    Profile
                </Link>
                </Button>
                </>
            )
        }

        else
        {
            return(
            <>
                <Button color='inherit'>
                <Link to='/signin'  className={classes.linkStyle}>
                    Sign In
                </Link>
                </Button>
    
                <Button color="inherit">
                    <Link to='/signup/student'  className={classes.linkStyle}>
                        Sign Up
                    </Link>
                </Button>
            </>
            )
           
        }
    }
    return(
        <>
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" className ={classes.root}>
                    <Link to="/" className={classes.linkStyle}>
                    Attendance Mangement
                    </Link>
                </Typography>

                {console.log(options)}
            {options()}
               
            </Toolbar>  
        </AppBar>
        </>
    );
}

export default NavBar