import React,{useState} from 'react';
import { makeStyles, theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { Redirect } from 'react-router'
import { useHistory } from "react-router-dom";

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

export default function SerchBar({ onSearchClose }){
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocussed, setFocussed] = useState(false);
  const history = useHistory()

  const onSearch = (event) => {
    setFocussed(true);
    if (event.key === "Enter") {
      // showToast(true);
     
      setFocussed(false);
      onSearchClose();
    }
  }
  const [toSearch, setToSearch] = useState(false);

  return(
      <Container maxWidth = 'lg'>
          <Grid container justify = "center" >
              <Grid xs = {11} md = {9}>
                <Paper component="form" className={classes.root} elevation = {2} >
                  <InputBase
                    className={classes.input}
                    type="search"
                    placeholder="What are you looking for?"
                    inputProps={{ 'aria-label': 'What are you looking for?' }}
                    value={searchTerm}
                    onClick={() => setFocussed(true)}
                    onChange={event => setSearchTerm(event.target.value)}
                    onKeyDown={(event) => (event.key === "Enter")&& history.push({
                      pathname: '/search',
                      search: '?q='+searchTerm
                    })}
                    inputTypeSearch
                  />
                  {console.log(searchTerm)}
                  <IconButton type="submit" className={classes.iconButton} aria-label="search" component = {Link} to="/search">
                    <SearchIcon />
                  </IconButton>
                  <Divider className={classes.divider} orientation="vertical" />
                </Paper>
                
                </Grid>
          
              </Grid>
      
      </Container>
        
  );

}
