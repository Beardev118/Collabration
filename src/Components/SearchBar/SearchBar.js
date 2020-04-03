import React,{useState,useContext} from 'react';
import { makeStyles, theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import {SearchContext} from './SearchBarContext'

const useStyles = makeStyles((theme: theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',

    },
    input: {
      flex: 1,
      paddingLeft:'10px'
    },

    divider: {
      height: 28,
      margin: 4,
    },
   
  }),
);

export default function SerchBar(){
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocussed, setFocussed] = useState(false);
  const [searchQuery,setSearchQuery] = useContext(SearchContext)
  const history = useHistory()

  const onSearch = (event) => {
    setFocussed(true);
    if (event.key === "Enter") {
      // showToast(true);
      setFocussed(false);
    }
  }
  const usp = new URLSearchParams();
  usp.set('q',searchTerm)

  const hanldEnterDown = event=>{
    if (window.location.pathname==="/search") {
      console.log('This is search page')
      if (event.key === "Enter") {
        event.preventDefault();
        history.push({
          pathname: '/search',
          search: usp.toString()
        })
        window.location.reload(false);
        setSearchQuery(searchTerm);
        console.log("This is context part");
        // console.log(searchTerm);
        console.log(searchQuery);
      }
      
    }else{
      console.log('This is not search page')

      if (event.key === "Enter") {
        history.push({
          pathname: '/search',
          search: usp.toString()
        })
        setSearchQuery(searchTerm);
        console.log("This is context part");
        // console.log(searchTerm);
        console.log(searchQuery);
       } 
    }
   
   
     
    
   
  }
  


  return(
      <Container maxWidth = 'lg'>
          <Grid container justify = "center" >
              <Grid xs = {11} md = {9}>
                <Paper component="form" className={classes.root} elevation = {2} >
                  <InputBase
                    className={classes.input}
                    type="search"
                    placeholder="What are you looking for?"
                    value={searchTerm}
                    onClick={() => setFocussed(true)}
                    onChange={event => setSearchTerm(event.target.value)}
                    onKeyDown={hanldEnterDown}
                    autoFocus
                    style = {{minHeight:'50px'}}
                  />
                  {/* {searchTerm&&<IconButton type="button" className={classes.iconButton} aria-label="search" component = {Link} to={"/search?"+usp.toString()}> */}
                    <SearchIcon />
                  {/* </IconButton>} */}
                  <Divider className={classes.divider} orientation="vertical" />
                </Paper>
                
                </Grid>

              </Grid>
      
      </Container>
        
  );

}
