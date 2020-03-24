import React from 'react';
import ProdcutArea from '../Components/ProductArea/ProductArea'
import MenuBar from '../Components/MenuBar/MenuBar'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function App() {

  return (
      <React.Fragment>

        <MenuBar/>
        <ProdcutArea/>
        <Grid container spacing={3} direction = "row" justify = "flex-end">
            <Grid item>
            <Pagination count={10} shape="rounded"/>
            </Grid>
         </Grid>
       

          <div style = {{width:'100%',height:'100%'}}>
            <div style = {{zIndex:3}}>
                <MenuBar/>  
            </div>
            <div >
                <ProdcutArea/>
            </div> 
          </div>

      </React.Fragment>
        
  );
}
