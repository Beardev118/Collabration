import React,{useState,useEffect} from 'react';
import ProdcutArea from '../../Components/ProductArea/ProductArea'
import MenuBar from '../../Components/MenuBar/MenuBar'
import Pagination from '@material-ui/lab/Pagination';
import { Grid, Typography } from '@material-ui/core';
import Header from '../../Components/Header/Header'
import Container from '@material-ui/core/Container'
import Footer from '../../Components/Footer/Footer'
import Loading from '../../Components/Loading/Loading'
import {useLocation} from "react-router-dom"
import NullPage from '../../Components/NullPage/NullPage'
import { useHistory } from "react-router-dom";


const useFetch = (search)=>{
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuData, setMenuData] = useState(null);
  const [returnVal, setReturnVal] = useState(null);
  
  useEffect(() => {
    let ignore = false;
    async function fetchData (){
      const url = `http://3.10.195.126:3000/products/search?${search}`
      const response = await fetch(url);
      const data = await response.json();
      const [products] = data.products;
      const [categories] = data.category;
      const [sizes] = data.size;
      const [brands] = data.brand;
      const [result] = data.results;

      if (!ignore) {

        if (result =='ok') {
          const categoryData = categories.map((label,index) => ({"key":'category'+index, "label":label,"selected":false,"menuKind":"category" }))
          const sizeData =  sizes.map((label,index) => ({"key":'size'+index, "label":label,"selected":false,"menuKind":"size" }))
          const brandData = brands.map((label,index) => ({"key":'brand'+index, "label":label,"selected":false,"menuKind":"brand" }));
          const menu_Data_fetch = categoryData.concat(sizeData,brandData);
          setMenuData(menu_Data_fetch);
          setProducts(products);
          setLoading(false);
          setReturnVal(result);

        }else{
          // setMenuData(null);
          // setProducts(null);
          setLoading(false);
          setReturnVal(result);
        }
       
      }
    }
    fetchData();
    return () => { ignore = true };
  }, [search]);

  return {products,menuData,loading,returnVal};
}

const BackendQuery = (queryParam)=>{
  var keys = ['search_q','country','category','size','brand'];
  var backendQuery = new URLSearchParams();

  for(var key of keys) { 
    if (queryParam.getAll(key).length===0) {
      backendQuery.set(key,'null');
    }else{
      backendQuery.set(key,queryParam.getAll(key).join('*'));
    }
  }
  return backendQuery.toString();
}

export default function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory()

  let url = new URL(window.location.href);
  let searchQuery = new URLSearchParams(url.search.slice(1));
  
  const {products,menuData, loading,returnVal} = useFetch(BackendQuery(searchQuery));
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  
  

  return (
      <React.Fragment>
        <Header/>

        {loading?<Loading/>:
         
          <Container maxWidth = 'lg'>
            {(returnVal=='no results')&& <NullPage status = {true}/>}
          {menuData&&<MenuBar menu = {menuData}/>}
          <div></div>
        
         {products&& <ProdcutArea products = {products.slice((currentPage-1)*12,currentPage*12)}   />}
            <Grid container spacing={3} direction = "row" justify = "flex-end">
                <Grid item>
               {products&&<Pagination count={Math.ceil(products.length/12)} shape="rounded" page = {currentPage} onChange = {handleChange} />}
                </Grid>
            </Grid>
          <Footer/>
          </Container>
          // :
          //  <Container>
            
          //   <div style = {{height:'10vh'}}></div>
          //     <Typography>Your search for did not return any results.</Typography>
          //     <Typography variant = 'h4'>Search Tips</Typography>
          //     <ul>
          //       <li> Try searching by product type, brand or description </li>
          //       <li>Check your spelling</li>
          //       <li>Broaden your search by using fewer or more general words</li>
          //     </ul>
          //   </Container> 
        }
      </React.Fragment>
        
  );
}