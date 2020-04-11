import React,{useState,useContext} from 'react';
import { makeStyles, theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import { useHistory } from "react-router-dom";
// import {SearchContext} from './SearchBarContext'

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

export default function SerchBar({Close}){
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocussed, setFocussed] = useState(false);
  const history = useHistory()
  

  const hanldEnterDown = event=>{
      if (event.key === "Enter") {
        event.preventDefault();
       
          if ((window.location.pathname==="/search")) {
            Close();
          } 
          let url = new URL(window.location.href);
          let oldSearchQuery = new URLSearchParams(url.search.slice(1));
          let country = oldSearchQuery.get('country');
          let newSearchQuery = new URLSearchParams();
          newSearchQuery.set('country',country)
          newSearchQuery.set('search_q',searchTerm);
        
          history.push({
          pathname: '/search',
          search:newSearchQuery.toString().toLocaleLowerCase()

            })
    }
  }

  const handleIconButton = ()=>{

    if ((window.location.pathname==="/search")) {
      Close();
     } 
    let url = new URL(window.location.href);
    let oldSearchQuery = new URLSearchParams(url.search.slice(1));
    let country = oldSearchQuery.get('country');
    let newSearchQuery = new URLSearchParams();
    newSearchQuery.set('country',country)
    newSearchQuery.set('search_q',searchTerm);
    newSearchQuery.delete('category');
    newSearchQuery.delete('size');
    newSearchQuery.delete('brand');
   
    history.push({
    pathname: '/search',
    search:newSearchQuery.toString().toLocaleLowerCase()

      })
  }

  return(
        <Paper component="form" className={classes.root} elevation = {4} >
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
            fullWidth
          />
          {searchTerm&&<IconButton type="button" className={classes.iconButton} aria-label="search" onClick = {handleIconButton}>
            <SearchIcon />
          </IconButton>}
          <Divider className={classes.divider} orientation="vertical" />
        </Paper>
        
  );

}
