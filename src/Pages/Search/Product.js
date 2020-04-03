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
  const [menuData, setMenuData] = useState({}); 

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [isProduct, setIsProduct] = useState("")
  const [searchQuery, setsearchQuery] = useState('')


  let search = window.location.search;
  let params = new URLSearchParams(search);
  const newParams = new URLSearchParams();
  const searchTerm = params.get('q');
  const country_q = "United Kingdom";
  const category_q = null;
  const size_q = null;
  const brand_q = null;

  newParams.set('search_q',searchTerm)
  // newParams.set('search_q',searchQuery)
  newParams.set('country',country_q)
  newParams.set('category',category_q)
  newParams.set('size',size_q)
  newParams.set('brand',brand_q)
  // setsearchQuery(newParams.toString());
  !searchQuery&&console.log("There is no searchQuery")
  console.log(searchQuery)
    
  useEffect(() => {
    let ignore = false;
    async function fetchProduct() {
      let result = null;
      const response = await fetch('http://192.168.1.229:3000/products/search?'+newParams.toString());
      const json = await response.json();
      const [item] = json.products;
      const [categories] = json.category;
      console.log("This is category");
      console.log(categories);
      const [sizes] = json.size;
      const [brands] = json.brand;
      [result] = json.results;
      setIsProduct(result)

    
   
      let categoryData = categories.map((label,index) => ({"key":'category'+index, "label":label,"selected":false,"menuKind":"category" }))
      let sizeData =  sizes.map((label,index) => ({"key":'size'+index, "label":label,"selected":false,"menuKind":"size" }))
      let brandData = brands.map((label,index) => ({"key":'brand'+index, "label":label,"selected":false,"menuKind":"brand" }));
      let menuData_fetch = categoryData.concat(sizeData,brandData);
      console.log(categoryData);
      console.log("This is category");
      console.log(categories);
      console.log("This is size");
      console.log(sizeData);
     

      if (!ignore) {
      
        setProducts(item);
        setMenuData(menuData_fetch);
       
       
       

      //   console.log("This is category");
      // console.log(categories);
      // console.log("This is size");
      // console.log(sizes);
      // console.log("This is brand");
      // console.log(brands);
      // let categoryData = categories.map((label,index) => ({"key":'category'+index, "label":label,"selected":false,"menuKind":"category" }))
      // let sizeData =  sizes.map((label,index) => ({"key":'size'+index, "label":label,"selected":false,"menuKind":"size" }))
      // let brandData = brands.map((label,index) => ({"key":'brand'+index, "label":label,"selected":false,"menuKind":"brand" }));
      // const menuData = categoryData.concat(sizeData,brandData);
      // setMenuData(menuData);
      // console.log(categoryData);
      
      }
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
       { console.log("This is paroducts and menu in use effect")}
       { console.log(products)}
        {console.log(menuData)}
       { console.log("This is MenuData")}
     
   
        {!(isProduct=="no results")?
        <div>
          {products==null?<Loading/>:(<Container maxWidth = 'lg'>
            {/* {console.log(menuData)} */}
              <MenuBar menu={menuData}/>
              <ProdcutArea products = {products.slice((currentPage-1)*12,currentPage*12)}   />
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
