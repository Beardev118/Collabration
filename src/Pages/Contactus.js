import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Header from '../Components/Header/Header';
import MetaTags from 'react-meta-tags';
import Footer from '../Components/Footer/Footer'


function Copyright() {
  return (
    
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        We are Polymer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];


export default function Contact_us() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <MetaTags>
            <title>Contact  ModaCompris Comparison Shopping Site CSS</title>
            <meta name="description" content="Contact ModaCompris comparison shopping site (CSS) to find out more about how you can get more traffic to your e-commerce website." />
            <meta property="og:title" content="Contact  ModaCompris Comparison Shopping Site CSS" />
          </MetaTags>
      <CssBaseline />
     <Header/>
      <Container maxWidth = "md">
            <Grid xs = {12} container justify = 'center' alignItems = 'center' >
                <Grid xs = {10} item >
                  <Box  mt = {8} mb = {4}>
                      <Typography variant="h5" color="textPrimary" align="center">
                      To add your feed to this site please use the form <Link href = "/add_feed" underline = "always" >here.</Link><br/>

                      To remove your feed from this site please send an email to shopping@wearepolymer.com<br/>
                      For other support please use the following contact details.<br/>
                      Email: shopping@wearepolymer.com<nbsp/> Telephone: +44 20 3920 7456
                      


                      </Typography>
                    </Box>
                </Grid>
              </Grid> 
        <Box> 
        
        <form>
        {/* <Typography >If you have business or other questions, please fill out the following form to contact us. Thank you.</Typography> */}
            <Grid container spacing={4} alignItems = "center" justify = "flex-start">
              <Grid item xs={12} md = {6} >
                  
                  <TextField
                    id="outlined-bare"
                    fullWidth
                    required
                    label = "Business Name"
                    autoFocus
                    autoComplete="off"
                    type="name"
                    
                    variant="outlined"
                  />
                </Grid>
                  
                <Grid item xs={12} sm = {6} >
                  
                  <TextField
                    id="outlined-bare"
                    fullWidth
                    required
                    label = "Website URL"
                    variant="outlined"
                    inputProps={{ 'aria-label': 'bare' }}
                  />
                </Grid>
                
                <Grid item xs={12} sm = {12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    inputRef={node => {
                    }}
                    autoComplete="off"
                    type="email"
        
                    FormHelperTextProps={{ error: true }}
              />
                </Grid>
                <Grid item xs={12} sm = {12}>
                  
                  <TextField
                      id="outlined-bare"
                      
                      fullWidth
                      required
                      label = 'Subject'
                      variant="outlined"
                      inputProps={{ 'aria-label': 'bare' }}
                    />
                </Grid>
            
            

         </Grid>
              <Box display="flex" flexDirection="column" mt = {5}>
                <Box mb={1} my = {5}>
                  <TextField
                    variant="outlined"
                    multiline
                    placeholder="Get in touch with us"
                    inputProps={{ "aria-label": "Get in Touch" }}
                    InputProps={{
                      className: classes.whiteBg
                    }}
                    rows={4}
                    fullWidth
                    required
                  />
                </Box>
               <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 color="primary"
                >
                  Send Message
                </Button>
              </Box>
            </form>
        </Box>
        <Footer/>            
      </Container>
           
    </React.Fragment>
  );
}