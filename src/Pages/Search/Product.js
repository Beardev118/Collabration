import React,{useState,useEffect} from 'react';
import ProdcutArea from '../../Components/ProductArea/ProductArea'
import MenuBar from '../../Components/MenuBar/MenuBar'
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import Header from '../../Components/Header/Header'
import Container from '@material-ui/core/Container'
import Footer from '../../Components/Footer/Footer'
import * as productData from './productdata'
import Loading from '../../Components/Loading/Loading'


export default function App() {


  const [products, setProducts] = useState(null);
  const [isloading, setIsloading] = useState(false)
 

  // useEffect(async() => {
  //   let ignore = false;
  //   const response = await fetch("http://192.168.1.192:3000/products/search?search_q=Frost+Grey&country=United%20Kingdom&category=Accessories*Footwear&size=UK%203*EU%2036*US%205&brand=Earth%20Spirit");
  //   const data = await response.json();
  //   const [item] = data.products;
  //   setIsloading(true);
  //   if (!ignore) {
  //     setProducts(item);
  //   }
  //   isloading&&setProducts(item);
  //   return () => {
  //     ignore = true;
  //   }
  // }, [])
    
  useEffect(() => {
    let ignore = false;
    async function fetchProduct() {
      const response = await fetch('http://localhost:3000/products/search?search_q=a&country=null&category=null&size=null&brand=null');
      const json = await response.json();
      const [item] = json.products;
      setIsloading(true);
      if (!ignore) setProducts(item);
    }

    fetchProduct();
    return () => { ignore = true };
  }, []);
  
  return (
      <React.Fragment>
        <Header/>
        {products==null?<Loading/>:(<Container maxWidth = 'lg'>
        <MenuBar/>
       <ProdcutArea products = {products}/>
        <Grid container spacing={3} direction = "row" justify = "flex-end">
            <Grid item>
            <Pagination count={10} shape="rounded"/>
            </Grid>
         </Grid>
         <Footer/>
         </Container>)}
      </React.Fragment>
        
  );
}
