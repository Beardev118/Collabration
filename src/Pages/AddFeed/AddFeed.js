import React ,{useState, useEffect} from 'react';
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
import Header from '../../Components/Header/Header';
import MetaTags from 'react-meta-tags';
import Footer from '../../Components/Footer/Footer'
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormHelperText from '@material-ui/core/FormHelperText';
import { parsePhoneNumberFromString, parsePhoneNumber, AsYouType } from 'libphonenumber-js'

const countries = [
  { name: 'United Kingdom'},
  { name: 'Austria'},
  { name: 'Belgium'},
  { name: 'Czech Republic'},
  { name: 'France'},
  { name: 'Germany'},
  { name: 'Greece'},
  { name: 'Hungary'},
  { name: 'Ireland'},
  { name: 'Italy'},
  { name: 'Netherlands'},
  { name: 'Poland'},
  { name: 'Portugal'},
  { name: 'Romania'},
  { name: 'Spain'},
];

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

function isUrlValid(userInput) {
    let pat = /^https?:\/\//i;
    if (pat.test(userInput)){
        let res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if(res == null)
            return false;
        else
            return true;
    } else {
        return false;
    }
    
}

function isFeedUrlValid(str){
    if(str.length < 13) return false;
    let strA = str.slice(-13);
    let strB = str.slice(0, str.length-13);
    if(strA != "products.json" || (strB != null && !isUrlValid(strB))){
        return false;
    }
    return true;
}

function isUserNameValid(userName){
    let formIsValid = true;

    //Name
    if(userName == null){
       formIsValid = false;
    }

    if(typeof userName !== "undefined"){
       if(userName != null && !userName.match(/^[a-zA-Z]+$/)){
          formIsValid = false;
       }        
    }

    return formIsValid;
}

function isBusinessNameValid(str) {
    if(str == null) return false;
    const value = str.trim();
    let flag = true;
  
    if (value) {
      flag = true;
    } else {
      flag = false;
    }

    return flag;
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
    const [errorBusinessName, setErrorBusinessName] = useState('#FFFFFF');
    const [helperTextBusinessName, setHelperTextBusinessName] = useState('Please input your business name.');

    const [websiteUrl, setWebsiteUrl] = useState(null);
    const [errorWebsiteUrl, setErrorWebsiteUrl] = useState('#FFFFFF');
    const [helperTextWebsiteUrl, setHelperTextWebsiteUrl] = useState('Please input your website url correctly. ex : https://my.example.com');

    const [firstName, setFirstName] = useState(null);
    const [errorFirstName, setErrorFirstName] = useState('#FFFFFF');
    const [helperTextFirstName, setHelperTextFirstName] = useState('Please input your first name.');

    const [lastName, setLastName] = useState(null);
    const [errorLastName, setErrorLastName] = useState('#FFFFFF');
    const [helperTextLastName, setHelperTextLastName] = useState('Please input your last name.');

    const [emailAddress, setEmailAddress] = useState(null);
    const [errorEmail, setErrorEmail] = useState('#FFFFFF');
    const [helperTextEmail, setHelperTextEmail] = useState('Please input your email correctly.');

    const [country, setCountry] = useState(null);
    const [errorCountry, setErrorCountry] = useState('#FFFFFF');
    const [helperTextCountry, setHelperTextCountry] = useState('Please select a country.');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('#FFFFFF');
    const [helperTextPhoneNumber, setHelperTextPhoneNumber] = useState('Please input your phonenumber correctly. ex : +12345678900');

    const [feedMethod, setFeedMethod] = useState(null);

    const [feedURL, setFeedURL] = useState(null);
    const [errorFeedUrl, setErrorFeedUrl] = useState('#FFFFFF');
    const [helperTextFeedUrl, setHelperTextFeedUrl] = useState('Please input your feed url. ex : https://my.example.com/products.json');

    const [feedInfo, setFeedInfo] = useState([]);

    const [kindOfFeed, setKindOfFeed] = useState('');
    const [errorFeedKind, setErrorFeedKind] = useState(true);
    const [helperTextFeedKind, setHelperTextFeedKind] = useState('');

    const [checkSubmit, setSubmit] = useState(false);

    const AddFeedPanel = ()=>{
        // setFeedInfo([...setFeedInfo])
    }

    const handleRadioChange = (event) => {
        setKindOfFeed(event.target.value);
        setHelperTextFeedKind(' ');
        setErrorFeedKind(false);
    };

    const handleCheckboxChange = (event) => {
        if(checkSubmit){
            setSubmit(false);
        } else {
            let isAllReady = true;

            // check businessname

            if(!isBusinessNameValid(businessName)){
                isAllReady = false;
                setErrorBusinessName('#FF1744');
            }

            // check the username

            if(!isUserNameValid(firstName)){
                isAllReady = false;
                setErrorFirstName('#FF1744');
            }

            if(!isUserNameValid(lastName)){
                isAllReady = false;
                setErrorLastName('#FF1744');
            }

            // check the website url

            if(websiteUrl != null && !isUrlValid(websiteUrl)){
                isAllReady = false;
                setErrorWebsiteUrl('#FF1744');
            }

            // check the email address
            if(errorEmail == '#FF1744'){
                isAllReady = false;
                setErrorEmail('#FF1744');
            }

            // check the phone number
            const pn = parsePhoneNumberFromString(phoneNumber);
            if(pn != null){
                if(!pn.isPossible() || !pn.isValid()){
                    isAllReady = false;
                    setErrorPhoneNumber('#FF1744');
                } 
            }  else {
                isAllReady = false;
                setErrorPhoneNumber('#FF1744');
            }
            
            // check the country name
            if(typeof country === 'string' && country.length > 3){
                setErrorCountry('#FFFFFF');
            } else {
                isAllReady = false;
                setErrorCountry('#FF1744');
            }

            // check the kind of feed
            if ((kindOfFeed === 'google') || (kindOfFeed === 'shopify')) {
                setHelperTextFeedKind(' ');
                setErrorFeedKind(false);
            } else {
                isAllReady = false;
                setHelperTextFeedKind('Please select an option.');
                setErrorFeedKind(true);
            }

            // check the feed url
            if(feedURL != null && !isFeedUrlValid(feedURL)){
                isAllReady = false;
                setErrorFeedUrl('#FF1744');
            }

            setSubmit(isAllReady);
        }
    };

    const handleChange = (event) => {
        switch(event.target.name){
            case 'businessname':
                setBusinessName(event.target.value);
                if(isBusinessNameValid(event.target.value)){
                    setErrorBusinessName('#FFFFFF');
                } else {
                    setErrorBusinessName('#FF1744');
                }
                return;
            case 'websiteurl':
                setWebsiteUrl(event.target.value);
                if(event.target.value != null && isUrlValid(event.target.value)){
                    setErrorWebsiteUrl('#FFFFFF');
                } else {
                    setErrorWebsiteUrl('#FF1744');
                }
                return;
            case 'firstname':
                setFirstName(event.target.value);
                if(isUserNameValid(event.target.value)){
                    setErrorFirstName('#FFFFFF');
                } else {
                    setErrorFirstName('#FF1744');
                }
                return;
            case 'lastname':
                setLastName(event.target.value);
                if(isUserNameValid(event.target.value)){
                    setErrorLastName('#FFFFFF');
                } else {
                    setErrorLastName('#FF1744');
                }
                return;
            case 'email':
                setEmailAddress(event.target.value);
                if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(event.target.value)){
                    setErrorEmail('#FFFFFF');
                } else {
                    setErrorEmail('#FF1744');
                }
                return;
            case 'country_name':
                setCountry(event.target.value);
                return;
            case 'phonenumber':
                let strNum = new AsYouType().input(event.target.value);
                setPhoneNumber(strNum);
                const pn = parsePhoneNumberFromString(strNum);
                if(pn != null){
                    if(!pn.isPossible() || !pn.isValid()){
                        setErrorPhoneNumber('#FF1744');
                    } else {
                        setErrorPhoneNumber('#FFFFFF');
                    }
                }  else {
                    setErrorPhoneNumber('#FF1744');
                }
                return;
            case 'feed_url':
                setFeedURL(event.target.value);
                if(event.target.value != null && isFeedUrlValid(event.target.value)){
                    setErrorFeedUrl('#FFFFFF');
                } else {
                    setErrorFeedUrl('#FF1744');
                }
                return;
        }
    };

    const handleEnterDown = (event) => {     
        if (event.key === "Enter") {
            event.preventDefault();
            switch(event.target.name){
                case 'businessname':
                    setBusinessName(event.target.value);
                    if(isBusinessNameValid(event.target.value)){
                        setErrorBusinessName('#FFFFFF');
                    } else {
                        setErrorBusinessName('#FF1744');
                    }
                    return;
                case 'websiteurl':
                    setWebsiteUrl(event.target.value);
                    if(event.target.value != null && isUrlValid(event.target.value)){
                        setErrorWebsiteUrl('#FFFFFF');
                    } else {
                        setErrorWebsiteUrl('#FF1744');
                    }
                    return;
                case 'firstname':
                    setFirstName(event.target.value);
                    if(isUserNameValid(event.target.value)){
                        setErrorFirstName('#FFFFFF');
                    } else {
                        setErrorFirstName('#FF1744');
                    }
                    return;
                case 'lastname':
                    setLastName(event.target.value);
                    if(isUserNameValid(event.target.value)){
                        setErrorLastName('#FFFFFF');
                    } else {
                        setErrorLastName('#FF1744');
                    }
                    return;
                case 'email':
                    setEmailAddress(event.target.value);
                    if(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(event.target.value)){
                        setErrorEmail('#FFFFFF');
                    } else {
                        setErrorEmail('#FF1744');
                    }
                    return;
                case 'country_name':
                    setCountry(event.target.value);
                    return;
                case 'phonenumber':
                    let strNum = new AsYouType().input(event.target.value);
                    setPhoneNumber(strNum);
                    const pn = parsePhoneNumberFromString(strNum);
                    if(pn != null){
                        if(!pn.isPossible() || !pn.isValid()){
                            setErrorPhoneNumber('#FF1744');
                        } else {
                            setErrorPhoneNumber('#FFFFFF');
                        }
                    }  else {
                        setErrorPhoneNumber('#FF1744');
                    }
                    return;
                case 'feed_url':
                    setFeedURL(event.target.value);
                    if(event.target.value != null && isFeedUrlValid(event.target.value)){
                        setErrorFeedUrl('#FFFFFF');
                    } else {
                        setErrorFeedUrl('#FF1744');
                    }
                    return;
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmit(false);
        const newurl = `http://35.179.64.176/api/feeds/`;
        fetch(newurl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                feed_url: feedURL,
                businessname: businessName,
                websiteurl: websiteUrl,
                firstname: firstName,
                lastname: lastName,
                email: emailAddress,
                phonenumber: phoneNumber,
                country_name: country,
                feed_type: kindOfFeed,
            })
        }).then(res => res.json()).then((response) => {
            alert(response.results);
        }).catch(error => {
            alert(error.message);
        }); 
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
                    <form className={classes.form} onSubmit = { handleSubmit } noValidate>
                        <Grid container spacing={4} alignItems = "center" justify = "flex-start">
                            <Grid item xs={12} sm = {6} >
                                <TextField
                                    id="outlined-bare"
                                    fullWidth
                                    required
                                    label = "Business Name"
                                    name = "businessname"
                                    value = { businessName }
                                    autoComplete = "off"
                                    type = "name"
                                    variant = "outlined"
                                    onChange = { handleChange } 
                                    onKeyDown = { (e) => handleEnterDown(e) }
                                />
                                <FormHelperText>
                                    <Typography variant = "h5" style = {{color: errorBusinessName}} >
                                        { helperTextBusinessName }
                                    </Typography>
                                </FormHelperText>
                            </Grid>

                            <Grid item xs={12} sm = {6} >
                                <TextField
                                    id="outlined-bare"
                                    fullWidth
                                    required
                                    label = "Website URL"
                                    name = "websiteurl"
                                    value = { websiteUrl }
                                    autoComplete = "off"
                                    onChange = { handleChange }
                                    onKeyDown = { (e) => handleEnterDown(e) }
                                    variant = "outlined"
                                    inputProps = {{ 'aria-label': 'bare' }}
                                />
                                <FormHelperText>
                                    <Typography variant = "h5" style = {{color: errorWebsiteUrl}} >
                                        { helperTextWebsiteUrl }
                                    </Typography>
                                </FormHelperText>
                            </Grid>

                            <Grid item xs={12} sm = {6}>
                                <TextField
                                    id="outlined-bare"
                                    fullWidth
                                    required
                                    label= 'First Name'
                                    name = 'firstname'
                                    value = { firstName }
                                    autoComplete = "off"
                                    onChange={handleChange}
                                    onKeyDown={ (e) => handleEnterDown(e) }
                                    variant="outlined"
                                    inputProps={{ 'aria-label': 'bare' }}
                                />
                                <FormHelperText>
                                    <Typography variant = "h5" style = {{ color: errorFirstName }} >
                                        { helperTextFirstName }
                                    </Typography>
                                </FormHelperText>
                            </Grid>
                                
                            <Grid item xs={12} sm = {6}>
                                <TextField
                                    id="outlined-bare"
                                    required
                                    fullWidth
                                    label = "Last Name"
                                    name = 'lastname'
                                    value = { lastName }
                                    autoComplete = "off"
                                    onChange = { handleChange }
                                    onKeyDown = { (e) => handleEnterDown(e) }
                                    variant="outlined"
                                    inputProps={{ 'aria-label': 'bare' }}
                                />
                                <FormHelperText>
                                    <Typography variant = "h5" style = {{ color: errorLastName }} >
                                        { helperTextLastName }
                                    </Typography>
                                </FormHelperText>
                            </Grid>

                            <Grid item xs={12} sm = {6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label = "Email Address"
                                    name = 'email'
                                    value = { emailAddress }
                                    autoComplete = "off"
                                    onChange={ handleChange }
                                    onKeyDown={ (e) => handleEnterDown(e) }
                                    type="email"
                                    FormHelperTextProps={{ error: true }}
                                />
                                <FormHelperText>
                                    <Typography variant = "h5" style = {{color: errorEmail}} >
                                        { helperTextEmail }
                                    </Typography>
                                </FormHelperText>
                            </Grid>

                            <Grid item xs={12} sm = {6}>
                                <Autocomplete
                                    id = "combo-box-country"
                                    value={ country }
                                    onChange={(event, newValue) => {
                                        if (newValue) {
                                        setCountry(newValue.name);
                                        setErrorCountry('#FFFFFF');
                                        return;
                                        } else {
                                        setCountry('');
                                        setErrorCountry('#FF1744');
                                        return;
                                        }
                                    }}
                                    options = { countries }
                                    getOptionLabel={(option) => {
                                        // e.g value selected with enter, right from the input
                                        if (typeof option === 'string') {
                                        return option;
                                        }
                                        if (option.inputValue) {
                                        return option.inputValue;
                                        }
                                        return option.name;
                                    }}
                                    // style={{ width: 300 }}
                                    fullWidth
                                    renderOption={(option) => option.name}
                                    renderInput={ 
                                        (params) => <TextField 
                                                        {...params} 
                                                        required
                                                        label="Country" 
                                                        name = 'country_name'
                                                        value = { country }
                                                        autoComplete = "off"
                                                        onKeyDown={ (e) => handleEnterDown(e) }
                                                        variant="outlined" 
                                                    />
                                    }
                                />
                                <FormHelperText>
                                    <Typography variant = "h5" style = {{color: errorCountry}} >
                                        { helperTextCountry }
                                    </Typography>
                                </FormHelperText>
                            </Grid>

                            <Grid item xs={12} sm = {6}>
                                <TextField
                                    id="outlined-bare"
                                    fullWidth
                                    required
                                    label = 'Phone Number'
                                    name = 'phonenumber'
                                    value = { phoneNumber }
                                    autoComplete = "off"
                                    variant="outlined"
                                    onChange={handleChange}
                                    onKeyDown={ (e) => handleEnterDown(e) }
                                    inputProps={{ 'aria-label': 'bare' }}
                                />
                                <FormHelperText>
                                    <Typography variant = "h5" style = {{color: errorPhoneNumber}} >
                                        { helperTextPhoneNumber }
                                    </Typography>
                                </FormHelperText>
                            </Grid>

                            <Grid xs = {12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Prefferred Upload Method</FormLabel>
                                    <RadioGroup row aria-label="position" name = "feed_type" value={ kindOfFeed } onChange={ handleRadioChange } >
                                        <FormControlLabel 
                                            value="google" 
                                            control={<Radio color="primary" />} 
                                            label="Google Shopping Feed" />

                                        <FormControlLabel 
                                            value="shopify" 
                                            control={<Radio color="primary" />} 
                                            label="Shopify Product Feed" />
                                    </RadioGroup>
                                    <FormHelperText>
                                        <Typography variant = "h5" color = 'error'>
                                            { helperTextFeedKind }
                                        </Typography>
                                    </FormHelperText>
                                </FormControl>
                            </Grid>
                            
                            <Container maxWidth = {"sm"} >
                                <Paper className = {classes.paper} >
                                    <Grid container xs = {12}  justify = "center">
                                        <Grid xs = {11}>
                                            <TextField 
                                                id="feed-url" 
                                                fullWidth
                                                required 
                                                label = "Feed URL"
                                                name = 'feed_url'
                                                value = { feedURL }
                                                autoComplete = "off"
                                                onChange={ handleChange }
                                                onKeyDown={ (e) => handleEnterDown(e) }
                                            />
                                            <FormHelperText>
                                                <Typography variant = "h5" style = {{color: errorFeedUrl}} >
                                                    { helperTextFeedUrl }
                                                </Typography>
                                            </FormHelperText>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Container>
                            <Container maxWidth = {"sm"} >
                                <Grid xs = {8}>
                                    {/* <IconButton aria-label="add" onClick = {AddFeedPanel}>
                                        <AddCircle/>
                                    </IconButton> */}
                                </Grid>
                            </Container>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox checked={ checkSubmit } onChange={ handleCheckboxChange } value="allowExtraEmails" color="default" />}
                                    label="I agree with privacy and policy."
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onSubmit = { handleSubmit }
                            disabled = { !checkSubmit }
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

