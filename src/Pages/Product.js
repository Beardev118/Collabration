import React from 'react';
import ProdcutArea from '../Components/ProductArea/ProductArea'
import MenuBar from '../Components/MenuBar/MenuBar'
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import Header from '../Components/Header/Header'
import Container from '@material-ui/core/Container'


export default function App() {

  return (
      <React.Fragment>
        <Header/>
        <Container maxWidth = 'lg'>
        <MenuBar/>
        <ProdcutArea/>
        <Grid container spacing={3} direction = "row" justify = "flex-end">
            <Grid item>
            <Pagination count={10} shape="rounded"/>
            </Grid>
         </Grid>
         </Container>
      </React.Fragment>
        
  );
}
