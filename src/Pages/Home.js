import React from 'react';
import Header from '../Components/Header/Header'
import SearchBar from '../Components/SearchBar/SearchBar'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { Typography, Link } from '@material-ui/core';
import MetaTags from 'react-meta-tags';
import Logo from '../asset/img/MetaLogo.png'

export default function Home(){
  return(
      // <Container maxWidth ="sm" style = {{ minHeight: '100vh'}} >
    <React.Fragment>

          <MetaTags>
            <title>ModaCompris Comparison Shopping Site CSS</title>
            <meta name="description" content="ModaCompris is a comparison shopping site (CSS) run by London based online performance agency We are Polymer." />
            <meta property="og:title" content="ModaCompris Comparison Shopping Site CSS" />
            <meta property="og:image" content="../asset/img/MetaLogo.png" />
          </MetaTags>
            <Header/>
              <div style = {{height:"30vh"}}></div>
            <Container maxWidth = "lg">
              <Grid container xs = {12} direction = "row">
              <SearchBar/>
                <Grid xs = {10} md = {12}>
                </Grid>
                <Grid container xs = {11} md = {9} justify = 'flex-end'style ={{marginTop:"10px"}}>
                  <Grid >
                     <Typography variant = "h6"> <Link href = "/privacy">Privacy Policy</Link>/<Link href = "/contact">Contact Us</Link></Typography>
                  </Grid>

                </Grid>
              </Grid>
             
             
            </Container>
             
    </React.Fragment>
      
  );

}
