import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import { Link, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  text:{
    marginLeft:'30px',
  },
  smallFont:{
    fontSize: '24px',
    width:'80%',
    margin:'auto',
    marginBottom:'20px'
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <div>
      {['left'].map(anchor => (
        <React.Fragment key={anchor}>
          <IconButton onClick={toggleDrawer("left", true) } style = {{padding:'0px'}}><MenuIcon/></IconButton>

          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration = {1000}>
          <div
            className={clsx(classes.list, {
              [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
              <div style  = {{marginTop:"10vh",marginLeft:'40px'}}></div>
                  <Typography variant = 'h1' className = {classes.smallFont}>ModaCompris</Typography>
                  <Link href = "/about" style = {{textDecoration:'none'}}>
                          <ListItem button key="about_us" >
                            <ListItemText primary="About Us" className = {classes.text}/>
                          </ListItem>
                        </Link>
                        <Divider/>
                        <Link href = "/faq" style = {{textDecoration:'none'}}>
                          <ListItem button key="faq">
                            <ListItemText primary="FAQ" className = {classes.text}/>
                          </ListItem>
                        </Link>
                        <Divider/>
                        <Link href = "/add_feed" style = {{textDecoration:'none'}}>
                          <ListItem button key="add_feed">
                          <ListItemText primary="Add Feed" className = {classes.text}/>
                          </ListItem>
                        </Link>
                        <Divider/>
                        <Link href = "/retailers" style = {{textDecoration:'none'}}>
                          <ListItem button key="retailers">
                          <ListItemText primary="Retailers" className = {classes.text}/>
                          </ListItem>
                        </Link>
                        <Divider/>
              </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
