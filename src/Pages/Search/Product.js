import React,{useState,useEffect,useContext} from 'react';
import ProdcutArea from '../../Components/ProductArea/ProductArea'
import MenuBar from '../../Components/MenuBar/MenuBar'
import Pagination from '@material-ui/lab/Pagination';
import { Grid, Typography } from '@material-ui/core';
import Header from '../../Components/Header/Header'
import Container from '@material-ui/core/Container'
import Footer from '../../Components/Footer/Footer'
import Loading from '../../Components/Loading/Loading'
import {useLocation} from "react-router-dom"
import {SearchContext} from '../../Components/SearchBar/SearchBarContext'

export default function App() {

  const [products, setProducts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [isProduct, setIsProduct] = useState("")
  const [searchQuery, setSearchQuery] = useContext(SearchContext);


  let search = window.location.search;
  let params = new URLSearchParams(search);
  const newParams = new URLSearchParams();
  const searchTerm = params.get('q');
  const country = "United Kingdom";
  const category = null;
  const size = null;
  const brand = null;

  newParams.set('search_q',searchTerm)
  // newParams.set('search_q',searchQuery)
  newParams.set('country',country)
  newParams.set('category',category)
  newParams.set('size',size)
  newParams.set('brand',brand)

    
  useEffect(() => {
    let ignore = false;
    async function fetchProduct() {
      let result = null;
      const response = await fetch('http://192.168.1.229:3000/products/search?'+newParams.toString());
      const json = await response.json();
      const [item] = json.products;
      [result] = json.results;
      setIsProduct(result)
      if (!ignore) setProducts(item);
    }

    fetchProduct();
    return () => { ignore = true };
  }, []);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  
  if(products ==! null){
    const totalProductsNum =products.length() ;
    setTotalPage(Math.ceil(totalProductsNum/12));
  }

  

  return (
      <React.Fragment>
        <Header/>
        {!searchQuery&&console.log("There is no searchQuery")}
        {console.log(searchQuery)}
        {!(isProduct=="no results")?
        <div>
          {products==null?<Loading/>:(<Container maxWidth = 'lg'>
              <MenuBar/>
              <ProdcutArea products = {products.slice((currentPage-1)*12,currentPage*12)}/>
                <Grid container spacing={3} direction = "row" justify = "flex-end">
                    <Grid item>
                    <Pagination count={totalPage} shape="rounded" page = {currentPage} onChange = {handleChange} />
                    </Grid>
                </Grid>
              <Footer/>
              </Container>)
                }
            </div>:
            <Container>
             <div style = {{height:'10vh'}}></div>
              <Typography>Your search for "{searchTerm}" did not return any results.</Typography>
              <Typography variant = 'h4'>Search Tips</Typography>
              <ul>
                <li> Try searching by product type, brand or description </li>
                <li>Check your spelling</li>
                <li>Broaden your search by using fewer or more general words</li>
              </ul>
            </Container>
        }
      </React.Fragment>
        
  );
}
