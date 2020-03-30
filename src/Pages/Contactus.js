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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import Header from '../Components/Header/Header'


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
      <CssBaseline />
     <Header/>
      <Container maxWidth = "md">
       
        <Box mt = {20}> 
        
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
     
      </Container>
           
    </React.Fragment>
  );
}