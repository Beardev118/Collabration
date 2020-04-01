import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Header from '../Components/Header/Header';
import MetaTags from 'react-meta-tags';
import Footer from '../Components/Footer/Footer'
import Aboutus from '../asset/img/about.jpg'
import Paper from '@material-ui/core/Paper'


const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

}));


export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment style = {{overflowY:"scroll"}}>
      <MetaTags>
            <title>ModaCompris Comparison Shopping Site by We are Polymer</title>
            <meta name="description" content="ModaCompris is a comparison shopping site (CSS) run by London based online performance agency We are Polymer." />
            <meta property="og:title" content="ModaCompris Comparison Shopping Site by We are Polymer" />
          </MetaTags>
      <Header/>
      <main>
{/* Hero unit */}
        <Container maxWidth="lg">
          <Grid container justify = "center" alignItems = "center">
            <Grid xs = {8} style = {{marginTop:"30px"}}>
              <img src = {Aboutus} style = {{width:"100%"}}/>
            </Grid>
            <Grid xs = {10} item>
              <Box  mt = {8} mb = {4}>
                  
                    <Typography variant="h5" align="center" color="primary" paragraph>
                    The ModaCompris comparison shopping site is run by London based online specialist performance marketing agency We are Polymer Ltd.

                    Founded in early 2020.<br/>  We are Polymer was created by an industry veteran with over one billion pounds of online marketing spend experience.<br/>  

                    This site provides a brand safe comparison service to retailers who are looking to expand their e-commerce activities.<br/> 

                    Get in touch with We are Polymer to find out how we can help you drive more online sales.<br/> 
                    </Typography>
              </Box>

              
              </Grid>
            </Grid>
           <Footer/>
          
        </Container>

    </main>

  {/* End hero unit */}
 
  

 
    </React.Fragment>
  );
}