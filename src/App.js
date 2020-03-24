import React,{useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Home from './Pages/HomePage';
import Product from './Pages/Product';
import About from './Pages/about';
import FAQ from './Pages/Faq';
import Retailers from './Pages/Retailer';
import AddFeed from './Pages/AddFeed';
import { Container, Grid } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import ExpandSearch from './Components/ExpandSearch/ExpandSearch';
import Drawer from './Components/Drawer/Drawer';




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
  topBarContainer:{
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
      <div className = {classes.topBarContainer}>
        <Container maxWidth="lg">

          <Hidden smDown>
              <Grid container direction = "row" justify = "center" alignItems = "center" spacing = {1}> 
                <Grid item xs={'auto'}>
                  <Typography  align = "left" variant ="h5">
                    Shop in: 
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <CountrySelect/>
                </Grid>
                <Grid item xs={5}>
                </Grid>
                  <Grid item xs={4}>
                    <Typography variant = "h6" className={classes.rightMenu} align = "right">
                      <Link className = {classes.menulink} to="/about"  className = {classes.menulink}>
                        About Us  |
                      </Link >
                      <Link className = {classes.menulink} to="/faq"  >
                        FAQ  |
                      </Link >
                      <Link className = {classes.menulink} to="/add_feed">
                        Add Feed  |
                      </Link >
                      <Link className = {classes.menulink} to="/retailers">
                        Retailers
                      </Link >
                    </Typography>
                  </Grid>
              </Grid>
          </Hidden >
          <Hidden mdUp>
            <Grid className = {classes.topSpace}></Grid>  
          </Hidden>  


        <Grid container direction = "row" justify = "center" alignItems = "flex-end" spacing = {0}>
          <Grid item xs={1}>

            <Hidden mdUp>
                <Paper className={classes.paper}>
                <Drawer />
                </Paper>
            </Hidden>
          </Grid>
          <Grid item xs={10}>

          <Paper className={classes.paper}>
              <Hidden smDown>
                    <Link to = "/" className = {classes.logoLink}>
                      <Typography   variant ="h1" >
                        We are <b>Polymer.</b><span className = {classes.logoSmall}>SHOP</span>
                      </Typography>
                    </Link>
                </Hidden>
                <Hidden mdUp>
                    <Link to = "/" className = {classes.logoLink}>
                      <Typography   variant ="h1" className = {classes.lg_logoLarge}>
                        We are <b>Polymer.</b><span className = {classes.lg_logoSmall}>SHOP</span>
                      </Typography>
                    </Link>
                </Hidden>
          </Paper>
          </Grid>
          
          <Grid item xs={1} >

            <Paper className={classes.paper}>
              <ExpandSearch/>
            </Paper>
              
          </Grid>

        </Grid>
      </Container>
      

      </div>
      <Container maxWidth = 'lg' >
            <Switch>
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
            </Switch>

      </Container>
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
      horizontal: 'left',
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
  );
}
