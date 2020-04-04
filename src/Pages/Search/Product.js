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
  const [menu_Data, setMenu_Data] = useState({}); 

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [isProduct, setIsProduct] = useState("")
  const [searchQuery, setsearchQuery] = useState('')

  const getBackenQuery = (url_query)=>{
    console.log(url_query.toString());
    let backendQuery = new URLSearchParams();
    var searchTerm = url_query.get('q')
    var country = url_query.get('Country')
    var arr_category = url_query.getAll('Category')
    var arr_brand = url_query.getAll('Brand')
    var arr_size =  url_query.getAll('Size')
    
    var  q_size = null;
    arr_size.forEach(element => {
        q_size =q_size+element+'*';
    });
    
    var q_category = null;
    arr_category.forEach(element => {
        q_category =q_category+element+'*';
    });
    var q_brand = null;
    arr_brand.forEach(element => {
        q_brand =q_brand+element+'*';
    });
    backendQuery.set('search_q',searchTerm);
    backendQuery.set('country',country);
    backendQuery.set('category',q_category);
    backendQuery.set('size',q_size);
    backendQuery.set('brand',q_brand);
        // console.log(backendQuery.toString());
        return backendQuery.toString(); 
  }


  let search = window.location.search;
  
  let params = new URLSearchParams(search);

  console.log(params.toString())
  const searchTerm = params.get('q');
  let backendQuery = getBackenQuery(params);

  console.log(backendQuery)
    
  useEffect(() => {
    let ignore = false;
    async function fetchProduct() {
      let result = null;
      const response = await fetch('http://192.168.1.229:3000/products/search?'+backendQuery);
      const json = await response.json();
      const [item] = json.products;
      const [categories] = json.category;
      console.log("This is category");
      console.log(categories);
      const [sizes] = json.size;
      const [brands] = json.brand;
      [result] = json.results;
      setIsProduct(result)
      if (result==='ok') {
        const categoryData = categories.map((label,index) => ({"key":'category'+index, "label":label,"selected":false,"menuKind":"Category" }))
        const sizeData =  sizes.map((label,index) => ({"key":'size'+index, "label":label,"selected":false,"menuKind":"Size" }))
        const brandData = brands.map((label,index) => ({"key":'brand'+index, "label":label,"selected":false,"menuKind":"Brand" }));
        const menu_Data_fetch = categoryData.concat(sizeData,brandData);
        console.log(categoryData);
        console.log("This is category");
        console.log(categories);
        console.log("This is size");
        console.log(sizeData);
        setMenu_Data(menu_Data_fetch);
      }

      if (!ignore) {
      setProducts(item);
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
        {console.log(menu_Data)}
       { console.log("This is Menu_Data")}
     
   
        {!(isProduct=="no results")?
        <div>
          {products==null?<Loading/>:(<Container maxWidth = 'lg'>
            {console.log(menu_Data)}
              <MenuBar menu = {menu_Data}/>
              <div></div>
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
