import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import Container from '@material-ui/core/Container' 
import Loding from '../Components/Loading/Loading'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width:'100%',
    margin:'auto',
  },

  buttonbase:{
    textAlign: 'center',
    width:'100%'

  }
}));


function createData(vendor_businessname, vendor_websiteurl, vendor_country) {
  return { vendor_businessname, vendor_websiteurl, vendor_country };
}


const useFetchRetailers = () => {
  const [retailers, setRetailers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const apiUrl = `http://localhost:3000/api/vendors/0`
   
    fetch(apiUrl)
      .then(res => res.json())
      .then(json => {
        setLoading(false)
        if (json.vendors_all && json.vendors_all != 'no results') {
          setRetailers(json.vendors_all);
        } else {
          setRetailers([]);
        }
      })
      .catch(err => {
        setError(err)
        // setLoading(false)
      })
  }, [])

  return { retailers, loading, error }
}


export default function Retailers(){

  const {retailers,loading,error} = useFetchRetailers(); 
  const classes = useStyles();

  return (
    <div>
      <Header/>
      {
        loading ? <Loding/> :
                  <Container maxWidth = 'lg' style = {{marginTop:'10vh'}}>
                    <Grid container spacing={3} >
                      {console.log(retailers)}
                      {
                        retailers && 
                        retailers.map((retailer)=>(
                          <Grid item xs={12} sm={6} md = {4} lg = {3} >
                            <ButtonBase className = {classes.buttonbase} href = {retailer.vendor_websiteurl} target="_blank">
                              <Paper className={classes.paper} elevation = {4}>
                                {retailer.vendor_businessname == "null" ? 
                                  <Typography gutterBottom variant="subtitle1" style = {{color:'#FFFFFF'}}>
                                    {retailer.vendor_businessname = "Business Name"}
                                  </Typography> :
                                  <Typography gutterBottom variant="subtitle1" color = 'primary'>
                                    {retailer.vendor_businessname.replace(/(.{30})..+/, "$1…")}
                                  </Typography>
                                }
                                <Typography variant="body2" gutterBottom>
                                  {/* {retailer.website_url} */}
                                  {retailer.vendor_websiteurl.replace(/(.{40})..+/, "$1…")}
                                </Typography>
                              </Paper>
                            </ButtonBase>
                          </Grid>
                        ))
                      }
                    </Grid>
        
                    <Footer/>
                  </Container>
      }        
    </div> 
  );
}
