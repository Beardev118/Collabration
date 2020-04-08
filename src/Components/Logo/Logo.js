import React,{useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';




const useStyles = makeStyles(theme => ({
 
  logoLargebold:{
  },
  logoSmall:{
    fontSize: '35px',
  },
 
  logoLink:{
    color: 'inherit',
    textDecoration: 'inherit',
  },
  
  lg_logoLarge:{
    fontSize: '24px',
  },
  lg_logoLargebold:{
    fontSize: '24px',
  },
  lg_logoSmall:{
    fontSize: '12px',
      
  },
  middle_logoLarge:{
  fontrSize:'35px',
  },
  middle_logoSmall:{
    fontSize:'15px',
  },

  paper: {
    textAlign: 'center',
    // padding:3,
    boxShadow:'none',
    
  },
  topSpace:{
    height:'30px',
  },
  menulink:{
    // color: "#1A1919",
    color: 'inherit',
    textDecoration: 'inherit',
  }
  
}));


export default function Logo() {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
        <Hidden smDown>
              <Link to = "/" className = {classes.logoLink}>
                <Typography   variant ="h1" style = {{color:'#000'}}>
                  <b>ModaCompris</b>
                </Typography>
              </Link>
          </Hidden>
          <Hidden mdUp>
              <Link to = "/" className = {classes.logoLink}>
                <Typography   variant ="h1" className = {classes.lg_logoLarge}>
                <b>ModaCompris</b>
                </Typography>
              </Link>
          </Hidden>
      </Paper>
    )
}

