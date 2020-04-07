import React,{useState,useEffect} from "react";
import { makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box'
import EarthIcon from '@material-ui/icons/LanguageOutlined';
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/CloseRounded'
import Markdown from 'markdown-to-jsx';

import { Hidden } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
   
    fullList: {
      width: 'auto',
    },
    productArea: {
        flexGrow: 1,
        width:'100%',
        margin:'auto',
        minHeight:'80vh',
       
    },
    
    root: {
        maxWidth: '100%',
      },
      media: {
        height: 250,
      },
      urlInfo:{
       
        marginLeft:15,
        marginBottom:20, 
      },
      priceInfo:{
        marginTop:-15,
        marginLeft:15,

      },
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
      relatedItem:{
        display:'flex',
        justifyContent:'center',
        padding:10,
        marginTop:20
        // textAlign:'center',
        

      },
      cardMediaDrawer:{
        paddingTop:'56.25%',
      },
      mediaDrawer:{
        height: 500,
        zIndex:-1,
      },
  }));

export default function ProdcutArea(props){
      const classes = useStyles();
      const {products} = props;
     
     
      return (
        <div className={classes.productArea}>
          
          <Container className={classes.cardGrid} maxWidth="xl">

                <Grid container spacing={4}>
                 
                  {products.map(product => (
                    <Grid item  xs={12} sm={6} md={3}>
                      <ProductCard product ={product} />
                    </Grid>
                   ))} 
                </Grid>
              </Container>
          
        </div>
      );

}

// ProdcutArea.prototype = {
//     products: PropTypes.array,
// }


const useFetchSkus = (productID) => {
  const [skus, setSkus] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const apiUrl = `http://192.168.1.229:3000/products/compare?product_id=${productID}`
   
    fetch(apiUrl)
      .then(res => res.json())
      .then(json => {
        setLoading(false)
        if (json.results) {
          setSkus(json.results)
        
        } else {
          setSkus([])
        }
      })
      .catch(err => {
        setError(err)
        // setLoading(false)
      })

  // This is important. We pass the new search parameter into
  // the empty array we had before. This means, the effect
  // will run again if this parameter changes
  }, [productID])

  return { skus, loading, error }
}


  function ProductCard(props) {
    const classes = useStyles();
    const [state, setState] = React.useState(false);
    const [value, setValue] = React.useState(5);
    const {product} = props
  

    const { skus, loading, error } = useFetchSkus(product.product_id);
  
    // if (loading) return <div>Loading...</div>
    // if (error) return <div>{error}</div>
    const toggleDrawer = (open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setState(open);
    };
  
    return (
      <div> 
        <Card className={classes.root} elevation={3}>
            <CardActionArea onClick = {toggleDrawer(true)}>
              <CardMedia
                className={classes.media}
                image={product.product_imgurl}
                title="content picture"
              />
              <CardContent>
                <Typography  variant="subtitle1" component="h4" align = "left">
                {product.product_title.replace(/(.{25})..+/, "$1…")}
                </Typography>
              </CardContent>
            </CardActionArea >
            
            
              <Typography variant="body1" align = {"left"} className = {classes.priceInfo}> 
                {product.product_currency}{product.product_price}
              </Typography>
              <Typography variant="body2" align = {"left"} className = {classes.urlInfo}>
              {new URL(product.product_url).hostname}
              </Typography>
          
          </Card>

          <Hidden mdDown>
          <Drawer anchor = {'right'} open={state} onClose={toggleDrawer(false)} transitionDuration = {700}>
                <div
                  role="presentation"
                  onKeyDown={toggleDrawer(false)}
                  style = {{width:"500px"}}
                  >
                 

                  <Card className={classes.root}>
                  <IconButton onClick = {toggleDrawer(false)} style = {{zIndex:2}}>
                    <CloseIcon/>
                  </IconButton>
                    <CardMedia
                      className={classes.mediaDrawer}
                      image={product.product_imgurl}
                      title={product.product_title}
                    />
                    <CardHeader
                      title={product.product_title}
                    />
                    <CardContent>
                      
                      <Grid container xs = {12}>
                        {/* <Grid xs = {5} >
                        <Rating name="read-only" value={value} readOnly />
                        </Grid> */}
                        <Grid xs = {2}>
                        <Typography variant = "subtitle1">{product.product_currency}{product.product_price} </Typography>
                        </Grid>
                        <Grid xs = {5}>
                          <Typography variant = "subtitle1">{product.product_brand} </Typography>
                        </Grid>
                      </Grid>

                      <Typography variant="body2" color="textSecondary" component="p">
                        <Markdown>
                          {product.product_detail}
                        </Markdown>
                      </Typography>
                      {/* <Box component="fieldset" mb={3} borderColor="transparent">
                      </Box> */}
                    </CardContent>
                    <CardActions disableSpacing>
                      
                  </CardActions>
              
              </Card>
              <Grid container style = {{marginBottom:'50px'}}>
              { skus &&
                skus.length > 0 &&
                skus.map(sku => (
              <Grid container xs = {12} >
                  <Grid xs = {1}></Grid>
                    <Grid xs = {10} >
                      <Paper className = {classes.relatedItem} square>
                        <Grid xs = {2}>
                            <Typography>{sku.product_currency} {sku.product_price}</Typography>
                        </Grid >
                        <Grid xs = {2}>
                        <EarthIcon></EarthIcon>
                        </Grid>
                         <Grid xs = {6}>
                         <Link href = {sku.product_url} target="_blank">
                        <Typography>{
                        new URL( sku.product_url).hostname
                         }</Typography></Link>

                         </Grid>
                          
                      </Paper>
                        
                    </Grid>
                    <Grid xs = {1} ></Grid>
              </Grid>
               
               ))}
               
              </Grid>
                
           </div>
        </Drawer>
          </Hidden>
          <Hidden mdUp>
          <Drawer anchor = {'right'} open={state} onClose={toggleDrawer(false)} transitionDuration = {700}>
                <div
                  role="presentation"
                  onKeyDown={toggleDrawer(false)}
                  style = {{width:'100%'}}
                  >
                 
                  <Card className={classes.root}>
                  
                    <CardMedia
                      className={classes.media}
                      image={product.product_imgurl}
                      title={product.product_title}
                      style = {{position:"absolute", top:'0px'}}
                    >
                    <IconButton onClick = {toggleDrawer(false)} style = {{position:"relative"}}>
                         <CloseIcon/>
                   </IconButton>
                    </CardMedia>
                    <CardHeader
                      title={product.product_title}
                    />
                    <CardContent>
                      
                      <Grid container xs = {12}>
                        <Grid xs = {5} >
                        <Rating name="read-only" value={value} readOnly />
                        </Grid>
                        <Grid xs = {2}>
                        <Typography variant = "subtitle1">{product.product_currency} {product.product_price} </Typography>
                        </Grid>
                        <Grid xs = {5}>
                          <Typography variant = "subtitle1">{product.product_brand} </Typography>
                        </Grid>
                      </Grid>

                      <Typography variant="body2" color="textSecondary" component="p">
                      <Markdown>
                          {product.product_detail}
                        </Markdown>
                      </Typography>
                      {/* <Box component="fieldset" mb={3} borderColor="transparent">
                      </Box> */}
                    </CardContent>
                    <CardActions disableSpacing>
                      
                  </CardActions>
              
              </Card>
              <Grid container>
              { skus &&
                skus.length > 0 &&
                skus.map(sku => (
              <Grid container xs = {12} style = {{margin:'10px',marginBottom:'30px'}}>
                 
                    <Grid xs = {12} >
                      <Paper className = {classes.relatedItem} square>
                        <Grid xs = {3}>
                            <Typography>{sku.product_currency} {sku.product_price}</Typography>
                        </Grid >
                        <Grid xs = {1}>
                        <EarthIcon></EarthIcon>
                        </Grid>
                         <Grid xs = {8}>
                         <Link href = {sku.product_url}><Typography>{sku.product_url}</Typography></Link>

                         </Grid>
                          
                      </Paper>
                        
                    </Grid>
              </Grid>
               ))}
               
              </Grid>
                
           </div>
        </Drawer>
          </Hidden>
      </div>
     
    );
  }

  ProductCard.prototype = {
    product: PropTypes.object
  }
