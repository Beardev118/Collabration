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

const GetBackenQuery = (searchParams)=>{
    
  // let backendQuery = new URLSearchParams();
  var backendQuery = new URLSearchParams();
  for(var key of searchParams.keys()) { 
    backendQuery.set(key,searchParams.getAll(key).join('*'));
    console.log(key); 
  }
  return backendQuery;
}

export default function SerchBar({Close}){
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocussed, setFocussed] = useState(false);
  // const [searchQuery,setSearchQuery] = useContext(SearchContext)
  const history = useHistory()

    // const [products, setProducts] = useState(null);
    const { searchData,menu_Data, searchQuery} = useContext(SearchContext);
  
    const [searchQuery_r, setSearchQuery_r] = searchQuery;
  

  const onSearch = (event) => {
    setFocussed(true);
    if (event.key === "Enter") {
      // showToast(true);
      setFocussed(false);
    }
  }
  
  const hanldEnterDown = event=>{
    if (window.location.pathname==="/search") {

      console.log('This is search page')
      if (event.key === "Enter") {
        console.log("This is searchQueryParameter on the search Bar");
        console.log (searchQuery_r.toString());
       event.preventDefault();
       const newSearchQuery = searchQuery_r.set('search_q',searchTerm);
      
     
       
       history.push({
       pathname: '/search',
          search: searchQuery_r.toString()
        })
        setSearchQuery_r(newSearchQuery);
       
        Close();
        
      }
      
    }else{
      console.log('This is not search page')
      console.log("This is searchQueryParameter on the search Bar");
      console.log (searchQuery_r.toString());
      if (event.key === "Enter") {
        const newSearchQuery = searchQuery_r.set('search_q',searchTerm);
        
        console.log("This is nw searchQueryParameter on the search Bar");
      console.log (searchQuery_r.toString());
      console.log (searchQuery_r);  
      
        history.push({
            pathname: '/search',
            search: searchQuery_r.toString()
          })
          setSearchQuery_r(newSearchQuery);
       
       } 
    }
   
  }

  return(
      <Container maxWidth = 'lg'>
        {console.log('this is searchquery')}
       {console.log(searchQuery_r)}
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
                  {searchTerm&&<IconButton type="button" className={classes.iconButton} aria-label="search" onClick = {hanldEnterDown}>
                    <SearchIcon />
                  </IconButton>}
                  <Divider className={classes.divider} orientation="vertical" />
                </Paper>
                
                </Grid>

              </Grid>
      
      </Container>
        
  );

}
