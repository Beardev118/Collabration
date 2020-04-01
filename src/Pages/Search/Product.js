import React,{useState,useEffect} from 'react';
import ProdcutArea from '../../Components/ProductArea/ProductArea'
import MenuBar from '../../Components/MenuBar/MenuBar'
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import Header from '../../Components/Header/Header'
import Container from '@material-ui/core/Container'
import Footer from '../../Components/Footer/Footer'
import * as productData from './productdata'


export default function App() {

  // const [products, setProducts] = useState([]);

  // useEffect(async() => {
  //   const response = await fetch("http://192.168.1.192:3000/products/search?search_q=Frost+Grey&country=United%20Kingdom&category=Accessories*Footwear&size=UK%203*EU%2036*US%205&brand=Earth%20Spirit");
  //   const data = await response.json();
  //   const [item] = data.products;
  //   setProducts(item);
  //   return () => {
  //   }
  // }, [])

  const [products, setProducts] = useState(null);
  const [isloading, setIsloading] = useState(false)

  useEffect(async() => {
    const response = await fetch("http://192.168.1.192:3000/products/search?search_q=Frost+Grey&country=United%20Kingdom&category=Accessories*Footwear&size=UK%203*EU%2036*US%205&brand=Earth%20Spirit");
    const data = await response.json();
    const [item] = data.products;
    setProducts(item);
    setIsloading(true);
  }, [])

    
    // console.log(products)

    // console.log(products)
    // for(var i in products){
    //   console.log(products[i].product_id);
    //   console.log(i);
    //   console.log(products[0]);
    // }
    // // products.map((item)=>())
  
  return (
      <React.Fragment>
        <Header/>
        <Container maxWidth = 'lg'>
        <MenuBar/>
        {isloading&&<ProdcutArea products = {products}/>}
        <Grid container spacing={3} direction = "row" justify = "flex-end">
            <Grid item>
            <Pagination count={10} shape="rounded"/>
            </Grid>
         </Grid>
         <Footer/>
         </Container>
      </React.Fragment>
        
  );
}
