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
  return { vendor_businessname, vendor_websiteurl,  vendor_country };
}


const useFetchRetailers = () => {
  const [retailers, setRetailers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const apiUrl = `http://3.10.195.126:3000/vendors/all`
   
    fetch(apiUrl)
      .then(res => res.json())
      .then(json => {
        setLoading(false)
        if (json.vendors_all) {
          setRetailers(json.vendors_all)
        } else {
          setRetailers([])
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
  // const [retailers, setRetailers] = useState([
  //   {business_name:'Leather to Love Forever Ltd', website_url:'https://bodaskins.com/collections/all.atom'},
  //   {business_name:'Bohomoon Ltd', website_url:'https://bohomoon.com/collections/all.atom'},
  //   {business_name:'Italy', website_url:'https://boredofsouthsea.co.uk/collections/all.atom'},
  //   {business_name:'Bored Ltd', website_url:'https://ciatelondon.com/collections/all.atom'},
  //   {business_name:'Ciate Ciate', website_url:'https://dizzykitten.co.uk/collections/all.atom'},
  //   {business_name:'Pink Boutique Ltd', website_url:'https://janesboutique.co.uk/collections/all.atom'},
  //   {business_name:'Universal Works', website_url:'https://jaggerylondon.co.uk/collections/all.atom'},
  //   {business_name:'Ireland', website_url:'https://beachcomberswimwear.co.uk/collections/all.sssssssssssssssssssssssssssssssssssssssatom'},
  //   {business_name:'Pavers Ltd', website_url:'https://fortune46.co.uk/collections/all.atom'},
  //   {business_name:'Alighieri Ltd', website_url:'https://flyfashion.co.uk/collections/all.atom'},
  //   {business_name:'Indoi Ltd', website_url:'https://flvrapparel.co.uk/collections/all.atom'},
  //   {business_name:'emaillip Limited ', website_url:'https://fancyfashions.co.uk/collections/all.atom'},
  //   {business_name:'iamVibes Ltd', website_url:'https://danniboutique.co.uk/collections/all.atom'},
  //   {business_name:'The Fashion Parade Ltd', website_url:'https://iwearitalia.co.uk/collections/all.atom'},
  //   {business_name:'Imogen Belfield Ltd', website_url:'https://itsinyourjeans.co.uk/collections/all.atom'},
  // ])

  const {retailers,loading,error} = useFetchRetailers()
  const classes = useStyles();

  return (
    <div>
      <Header/>

            {loading?<Loding/>:
                <Container maxWidth = 'lg' style = {{marginTop:'10vh'}}>
                <Grid container spacing={3} >
                  {console.log(retailers)}
                  {retailers&&retailers.map((retailer)=>(
                    <Grid item xs={12} sm={6} md = {4} lg = {3} >
                      <ButtonBase className = {classes.buttonbase} href = {retailer.vendor_websiteurl} target="_blank">
                        <Paper className={classes.paper} elevation = {4}>
                              <Typography gutterBottom variant="subtitle1" color = 'primary'>
                                {retailer.vendor_businessname.replace(/(.{30})..+/, "$1…")}
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                            {/* {retailer.website_url} */}
                            {retailer.vendor_websiteurl.replace(/(.{40})..+/, "$1…")}
                              </Typography>
                          </Paper>
                          </ButtonBase>
                  </Grid>
                  ))}
                </Grid>
        
          <Footer/>
        </Container>
            }
            
    </div>
     
  );
}
