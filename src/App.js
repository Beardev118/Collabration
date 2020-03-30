import React,{useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Home from './Pages/Home';
import Product from './Pages/Product';
import About from './Pages/about';
import FAQ from './Pages/Faq';
import Retailers from './Pages/Retailer';
import AddFeed from './Pages/AddFeed';
// import AddFeed from './Pages/AddFeed/AddFeed'
import { Container, Grid, ClickAwayListener } from '@material-ui/core';
import Admin from './Pages/Admin/Admin'
import Contact from './Pages/Contactus'
import Privacy from './Pages/Privacy'
import Fetch from './Components/Fetch/fetch'
// import TermsOfService from './Pages/TermsOfService'
//test



const useStyles = makeStyles(theme => ({
  rightMenu: {
    flexGrow: 1,
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
    textTransform:'none',
    fontStyle:'normal',
    fontWeight:'normal',

  },
  pageContainer:{
    msOverflowX:'hidden',
    marginRight: 'calc(-1 * (100vw - 100%))',
  },
  appbar:{
    boxShadow:'none',
  },

 
  toolbar: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },

  searchiconbut:{

    '&:hover':{
      background: 'none',
    },


  },
  menuButton:{
    padding:'0px',
  },

  menuIcon:{
    marginLeft:'10px',
  },

  countryButton:{
    textTransform:'none',
    fontStyle:'normal',
    fontWeight:'normal',

  },
  logoLargebold:{
  },
  logoSmall:{
    fontSize: '35px',
  },
  searchText:{
    marginRight:10,
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
    color: "#1A1919"
  }
  
}));




export default function ProminentAppBar() {
  const classes = useStyles();
  // const preventDefault = (event: sss) => event.preventDefault();
  const preventDefault = "sss";
 

  return (
    <Router>
      
     <div className = {classes.pageContainer}>
     <Fetch/>
            <Switch>
            {/* <Container maxWidth = 'lg'> */}
                  <Route exact path="/">
                    <Home/>
                  </Route>
                  <Route exact path = "/faq">
                    <FAQ/>
                  </Route>
                  <Route exact path="/about">
                    <About />
                  </Route>
                  <Route exact path="/retailers">
                    <Retailers/>
                  </Route>
                  <Route exact path = '/add_feed'>
                    <AddFeed/>
                  </Route>
                  <Route exact path="/product">
                    <Product/>
                  </Route>
                  <Route exact path="/admin">
                    <Admin/>
                  </Route>
                  <Route exact path="/privacy">
                    <Privacy/>
                  </Route>
                  <Route exact path="/contact">
                    <Contact/>
                  </Route>
              {/* </Container> */}
              <Fetch/>
            </Switch>

     
       
     </div>
      
     
     {/* <Fetch/> */}
    </Router>
  );
}

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const options = [
    'Select Country',
    'United Kingdom',
    'Czech Republic',
    'Greece',
    'Hungary',
    'Romania',
    'Austria',
    'Ireland',
    'Belgium',
    'Spain',
    'Italy',
    'France',
    'Netherlands',
    'Germany',
];

 function CountrySelect() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    // setAnchorEl(null);

  };

  const handleMenuItemClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  

 

  return (
    <ClickAwayListener onClickAway = {()=>{setAnchorEl(null);}}>
      <div className={classes.root}>
            <Button onClick  ={handleClick} > {options[selectedIndex]}</Button>
            <StyledMenu
              id="lock-menu"
              anchorEl = {anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              // onClose={handleClose}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  disabled={index === 0}
                  selected={index === selectedIndex}
                  onClick={event => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </StyledMenu>
          </div>
    </ClickAwayListener>
    
  );
}
