import React from 'react';
import ProdcutArea from '../Components/ProductArea/ProductArea'
import MenuBar from '../Components/MenuBar/MenuBar'
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';



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
       


      </React.Fragment>
        
  );
}
