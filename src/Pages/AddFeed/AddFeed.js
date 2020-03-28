import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';

import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Paper,
  IconButton,
  FormControl,
  FormLabel,
  Container,
  Checkbox
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircle from '@material-ui/icons/AddCircle';

import MuiAutoComplete from "./MuiAutoComplete";

import ButtonsResult from "./ButtonsResult";
import Header from '../../Components/Header/Header'
let renderCount = 0;


const defaultValues = {
  Native: "",
  TextField: "",
  Select: "",
  Checkbox: false,
  switch: false,
  RadioGroup: ""
};

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
  
  inputLabel:{
    marginBottom:5,
  },
  
  
}));

export default function AddFeed() {
  const { handleSubmit, register, reset, control } = useForm({ defaultValues });
  const [data, setData] = useState(null);
  renderCount++;
  const classes = useStyles();

  return (
    // <ThemeProvider theme={theme}>
    <React.Fragment>
      <Header/>
 <form onSubmit={handleSubmit(data => setData(data))} className="form">
        <div className="container">

            <Controller
              as={
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
    
                  <Grid item xs={12} sm = {6}>
                   
                    <TextField
                      id="outlined-bare"
                      fullWidth
                      required
                      label= 'First Name'
                      variant="outlined"
                      inputProps={{ 'aria-label': 'bare' }}
                    />
                  </Grid>
                    
                  <Grid item xs={12} sm = {6}>
                    
                    <TextField
                        id="outlined-bare"
                        required
                        fullWidth
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
                      label="Email Address"
                      inputRef={node => {
                      }}
                      autoComplete="off"
                      type="email"
                     
                      FormHelperTextProps={{ error: true }}
                />
                  </Grid>
                  <Grid item xs={12} sm = {6}>
                  <MuiAutoComplete 
                  control={control}
                  fullWidth
                  required
                  label = 'Country'
                  variant="outlined"
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
                   </Container>
                   <Container maxWidth = {"sm"} >
                    <Grid xs = {8}>
                      <IconButton aria-label="add">
                      <AddCircle/>
                      </IconButton>
                    </Grid>
                    </Container>
    
                   <Grid item xs={12}>
                      <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="default" />}
                        label="I agree with terms and conditions."
                      />
                  </Grid>
              </Grid>
              }
              name="RadioGroup"
              control={control}
            />

      
           
           
        </div>

        <ButtonsResult {...{ data, reset, defaultValues }} />
      </form>
    </React.Fragment>
     
  );
}


