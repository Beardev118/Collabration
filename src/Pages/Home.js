import React from 'react';
import Header from '../Components/Header/Header'
import SearchBar from '../Components/SearchBar/SearchBar'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { Typography, Link } from '@material-ui/core';
import MetaTags from 'react-meta-tags';
import Logo from '../Components/Logo/Logo'

export default function Home(){
  return(
    <React.Fragment>

          <MetaTags>
            <title>ModaCompris Comparison Shopping Site CSS</title>
            <meta name="description" content="ModaCompris is a comparison shopping site (CSS) run by London based online performance agency We are Polymer." />
            <meta property="og:title" content="ModaCompris Comparison Shopping Site CSS" />
          </MetaTags>
            <Header/>
              <div style = {{height:"25vh"}}></div>
            <Container maxWidth = "lg">
              <Grid container spacing = {4} justify = 'center' alignItems = 'center'>
                <Grid item xs = {12}>
                   <Logo/>
                </Grid>
                <Grid item xs = {12}>
                  <SearchBar/>
                </Grid>
                <Grid container xs = {9} md = {8} justify = 'flex-end'>
                  <Grid >
                     <Typography variant = "h6"> <Link href = "/privacy">Privacy Policy</Link>/<Link href = "/contact">Contact Us</Link></Typography>
                  </Grid>
                </Grid>
              </Grid>
             
             
            </Container>
             
    </React.Fragment>
      
  );

}
