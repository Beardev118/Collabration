import React,{useState,useEffect,useContext} from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Container, Grid, ClickAwayListener } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import ExpandSearch from '../ExpandSearch/ExpandSearch';
import Drawer from '../Drawer/Drawer';
import Logo from '../../Components/Logo/Logo'
import { useHistory } from "react-router-dom";
import {SearchContext} from '../../Components/SearchBar/SearchBarContext'

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
    // marginLeft: 'calc(100vw - 100%)',
  },
  appbar:{
    boxShadow:'none',
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
    // color: "#1A1919",
    color: 'inherit',
    textDecoration: 'inherit',
  }
  
}));




export default function ProminentAppBar() {
  const classes = useStyles();
  const {searchQuery} = useContext(SearchContext);
  const history = useHistory()
  const [searchQuery_r, setSearchQuery_r] = searchQuery;

  const country = [
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

  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
   
  };

  const handleMenuItemClick = (event, index) => {
    var newIndex;
    newIndex = index;
    setAnchorEl(event.currentTarget);
    setSelectedIndex(newIndex);
    setAnchorEl(null);
    

    var newSearchQuery = new URLSearchParams();
    newSearchQuery = searchQuery_r;
    newSearchQuery.set('country',country[index])
    setSearchQuery_r(newSearchQuery);
    if (window.location.pathname==="/search") {
      history.push({
        pathname: '/search',
        search: newSearchQuery.toString()
      })
    }

  };

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

  return (
    <div style = {{width:'100%'}}>
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
                <ClickAwayListener onClickAway = {()=>{setAnchorEl(null);}}>
    
                      <div  >
                        <p> </p>
                            <Button onClick  ={handleClick} style = {{marginTop:'-10px'}}> {country[selectedIndex] }</Button>
                            
                            <StyledMenu
                              id="lock-menu"
                              anchorEl = {anchorEl}
                              keepMounted
                              open={Boolean(anchorEl)}
                              // onClose={handleClose}
                            >
                              {country.map((option, index) => (
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

            {!(window.location.pathname==="/") &&<Logo/>}
            
          </Grid>
          
          <Grid item xs={1} >

            <Paper className={classes.paper}>

              { !(window.location.pathname==="/") && <ExpandSearch/>}
              
            </Paper>
              
          </Grid>

        </Grid>
      </Container>
      

      </div>
    </div>
     
     
  );
}
