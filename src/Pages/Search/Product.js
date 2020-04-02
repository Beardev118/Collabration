import React,{useState,useEffect} from 'react';
import ProdcutArea from '../../Components/ProductArea/ProductArea'
import MenuBar from '../../Components/MenuBar/MenuBar'
import Pagination from '@material-ui/lab/Pagination';
import { Grid } from '@material-ui/core';
import Header from '../../Components/Header/Header'
import Container from '@material-ui/core/Container'
import Footer from '../../Components/Footer/Footer'
import Loading from '../../Components/Loading/Loading'

export default function App() {

  const [products, setProducts] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
    
  useEffect(() => {
    let ignore = false;
    async function fetchProduct() {
      const response = await fetch('http://3.10.195.126:3000/products');
      const json = await response.json();
      const item = json;
      console.log("This is json");
      console.log(json);
      setIsloading(true);
      if (!ignore) setProducts(item);
    }

    fetchProduct();
    return () => { ignore = true };
  }, []);

  const handleChange = (event, value) => {
    setCurrentPage(value);
    console.log("current page is ");
    console.log(value);
  };
  
      if(products ==! null){
        const totalProductsNum =products.length() ;
        setTotalPage(Math.ceil(totalProductsNum/12));
      }

  return (
      <React.Fragment>
        <Header/>
        {console.log("This is product")}
        {console.log(totalPage)}
        { console.log("total page is")}
        {console.log(totalPage)}
        {products==null?<Loading/>:(<Container maxWidth = 'lg'>
        <MenuBar/>
       <ProdcutArea products = {products.slice((currentPage-1)*12,currentPage*12)}/>
        <Grid container spacing={3} direction = "row" justify = "flex-end">
            <Grid item>
            <Pagination count={totalPage} shape="rounded" page = {currentPage} onChange = {handleChange} />
            </Grid>
         </Grid>
         <Footer/>
         </Container>)}
      </React.Fragment>
        
  );
}
