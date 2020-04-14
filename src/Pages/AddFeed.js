import React ,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import { Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  // },
  inputLabel:{
    marginBottom:5,
  },
  
  
}));



export default function AddFeed() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [termsOfServiceError, setTermsOfServiceError] = useState(false);
  const [businessName, setBusinessName] = useState(null);
  const [websiteUrl, setWebsiteUrl] = useState(null);
  const [firsName, setFirsName] = useState(null);
  const [secondName, setSecondName] = useState(null);
  const [emailAddresss, setEmailAddresss] = useState(null);
  const [country, setCountry] = useState(null);
  const [phone, setPhone] = useState(null);
  const [feedMethod, setFeedMethod] = useState(null);
  const [feedURL, setFeedURL] = useState(null);
  const [feedCountry, setfeedCountry] = useState(null);
  const [feedInfo, setFeedInfo] = useState([]);

  const AddFeedPanel = ()=>{
    // setFeedInfo([...setFeedInfo])
  }

  const handleEnterDown = event=>{
    if (event.key === "Enter") {
      event.preventDefault();
       
      // if ((window.location.pathname==="/search")) {
      //   Close();
      // } 
      // let url = new URL(window.location.href);
      // let oldSearchQuery = new URLSearchParams(url.search.slice(1));
      // let country = oldSearchQuery.get('country');
      // let newSearchQuery = new URLSearchParams();
      // if(country != null){
      //   newSearchQuery.set('country',country)
      // }
      // // newSearchQuery.set('search_q',searchTerm);
      // newSearchQuery.set('q',searchTerm);
      
      // history.push({
      //   pathname: '/search',
      //   search:newSearchQuery.toString().toLocaleLowerCase()
      // })
    }
  }

  return (
    <div>
      <MetaTags>
            <title>Submit your feed to ModaCompris Comparison Shopping Site CSS</title>
            <meta name="description" content="Submit your shopping feed to ModaCompris comparison shopping site (CSS) today to get more traffic to your e-commerce website." />
            <meta property="og:title" content="Submit your feed to ModaCompris Comparison Shopping Site CSS" />
          </MetaTags>
      <Header/>
      <Container component="main" maxWidth="md">

          <Grid xs = {12} container justify = 'center' alignItems = 'center' >
            <Grid xs = {10} item >
              <Box  mt = {8} mb = {4}>
                  <Typography variant="h5" color="textPrimary" align="center">
                  By submitting your feed you give to us the  necessary rights to permit Google to access, index, cache or crawl the landing-page URL(s) of your site and the content available through such URL(s), and to display the information associated with the product ads that you submit. 
                  </Typography>
                </Box>
            </Grid>
          </Grid> 
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
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
                      onKeyDown={ handleEnterDown }
                    />
                  </Grid>
                  
                    
                  <Grid item xs={12} sm = {6} >
                    
                    <TextField
                      id="outlined-bare"
                      fullWidth
                      required
                      label = "Website URL"
                      variant="outlined"
                      onKeyDown={ handleEnterDown }
                      inputProps={{ 'aria-label': 'bare' }}
                    />
                  </Grid>

                  <Grid item xs={12} sm = {6}>
                    
                    <TextField
                      id="outlined-bare"
                      fullWidth
                      required
                      label= 'First Name'
                      onKeyDown={ handleEnterDown }
                      variant="outlined"
                      inputProps={{ 'aria-label': 'bare' }}
                    />
                  </Grid>
                    
                  <Grid item xs={12} sm = {6}>
                    {/* <InputLabel  htmlFor="bootstrap-input" className = {classes.inputLabel}>
                      Last Name
                    </InputLabel> */}
                    <TextField
                        id="outlined-bare"
                        required
                        fullWidth
                        onKeyDown={ handleEnterDown }
                        label = "Last Name"
                        variant="outlined"
                        inputProps={{ 'aria-label': 'bare' }}
                      />
                  </Grid>
                  <Grid item xs={12} sm = {6}>
                    
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      // error={status === "invalidEmail"}
                      label="Email Address"
                      inputRef={node => {
                        // this.registerEmail = node;
                      }}
                      // autoFocus
                      autoComplete="off"
                      type="email"
                      // onChange={() => {
                      //   if (status === "invalidEmail") {
                      //     setStatus(null);
                      //   }
                      // }}
                      onKeyDown={ handleEnterDown }
                      FormHelperTextProps={{ error: true }}
                />
                  </Grid>
                  <Grid item xs={12} sm = {6}>
                    
                    <TextField
                        id="outlined-bare"
                        fullWidth
                        required
                        label = 'Country'
                        variant="outlined"
                        onKeyDown={ handleEnterDown }
                        inputProps={{ 'aria-label': 'bare' }}
                      />
                  </Grid>
                  <Grid item xs={12} sm = {6}>
                    
                    <TextField
                        id="outlined-bare"
                        fullWidth
                        required
                        label = 'Phone'
                        variant="outlined"
                        onKeyDown={ handleEnterDown }
                        inputProps={{ 'aria-label': 'bare' }}
                      />
                  </Grid>
                  <Grid xs = {12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Prefferred Upload Method</FormLabel>
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">

                          <FormControlLabel 
                          value="first" 
                          control={<Radio color="primary" />} 
                          label="Google Shopping Feed" />

                          <FormControlLabel 
                          value="second" 
                          control={<Radio color="primary" />} 
                          label="Shopify Product Feed" />
                      </RadioGroup>
                    </FormControl>
                    </Grid>
                  
                    <Container maxWidth = {"sm"} >
                    <Paper className = {classes.paper} >
                            <Grid container xs = {12}  justify = "center">
                                <Grid item xs = {10}>
                                        Feed 1
                                </Grid>
                                <Grid item xs = {2}>
                                  <IconButton aria-label="delete">
                                    <DeleteIcon />
                                  </IconButton>
                                </Grid>
                                <Grid xs = {6}>
                                  <TextField id="feed-url" required label="Feed URL" />
                                  </Grid>
                                  <Grid>
                                  <TextField id="contry" required label="Contry" />
                                </Grid>
                              </Grid>
                         </Paper>
                      {
                        feedInfo.map((item,index)=>(
                          <Paper className = {classes.paper} >
                            <Grid container xs = {12}  justify = "center">
                                <Grid item xs = {10}>
                                        Feed 1
                                </Grid>
                                <Grid item xs = {2}>
                                  <IconButton aria-label="delete">
                                    <DeleteIcon />
                                  </IconButton>
                                </Grid>
                                <Grid xs = {6}>
                                  <TextField id="feed-url" required label="Feed URL" />
                                  </Grid>
                                  <Grid>
                                  <TextField id="contry" required label="Contry" />
                                </Grid>
                              </Grid>
                         </Paper>

                        ))
                      }
                    </Container>
                    <Container maxWidth = {"sm"} >
                    <Grid xs = {8}>
                      <IconButton aria-label="add" onClick = {AddFeedPanel}>
                         <AddCircle/>
                      </IconButton>
                    </Grid>
                    </Container>

                    <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="default" />}
                        label="I agree with privacy and policy."
                      />
                  </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
              
            
              
            </form>
          </div>
          <Footer/>
      </Container>
    </div>
    
  );
}

