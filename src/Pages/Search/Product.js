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
import {BackendQuery} from './BackendQuery'

// let prevQuery = null;
const useFetch = (search)=>{
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuData, setMenuData] = useState(null);
  const [returnVal, setReturnVal] = useState(null);
  
  useEffect(() => {
    let ignore = false;
    async function fetchData (){
      const url = `http://192.168.1.229:3000/api/products?${search}`
      const response = await fetch(url);
      const data = await response.json();
      const products = data.products;
      const [categories] = data.category;
      const [sizes] = data.size;
      const [brands] = data.brand;
      const [result] = data.results;

      if (!ignore) {

        if (result =='ok') {
            const categoryData = categories.map((label,index) => ({"key":'category'+index, "label":label,"selected":false,"menuKind":"category","visible":true }))
            const sizeData =  sizes.map((label,index) => ({"key":'size'+index, "label":label,"selected":false,"menuKind":"size","visible":true }))
            const brandData = brands.map((label,index) => ({"key":'brand'+index, "label":label,"selected":false,"menuKind":"brand","visible":true }));
            const menu_Data_fetch = categoryData.concat(sizeData,brandData);
            setMenuData(menu_Data_fetch);
        }
        setProducts(products);
        setLoading(false);
        setReturnVal(result);
      }else{
        setLoading(false);
        setReturnVal(result);
      }
    }
    fetchData();
    return () => { 
      ignore = true;
    };
  }, [search]);

  return {products,menuData,loading,returnVal};
}

let prevQuery = null;
let oldMenuData = null;
let isChangeSearch = true;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  let url = new URL(window.location.href);
  let searchQuery = new URLSearchParams(url.search.slice(1));
  let currQuery = searchQuery.get('search_q');
  let currcountry = searchQuery.get('country');
  let currcategory = searchQuery.get('category');
  let currsize = searchQuery.get('size');
  let currbrand = searchQuery.get('brand');

  if (((currcountry != "null") | (currcategory != null) | (currsize != null) | (currbrand != null)) ) {
    prevQuery = currQuery;
    isChangeSearch = false;
  } else {
    prevQuery = currQuery;
    isChangeSearch = true;
  }
  
  const {products, menuData, loading,returnVal} = useFetch(BackendQuery(searchQuery));
  
  if(isChangeSearch){
    oldMenuData = menuData;
  }
  
  console.log("product_menuData");
  console.log(menuData); 
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  let url_out = new URL(window.location.href);
  let searchQuery_out = new URLSearchParams(url_out.search.slice(1));
  let curQuery = searchQuery_out.get('search_q');
    
  return (
    <React.Fragment>
      <Header/>

      {loading?<Loading/>:
        
        <Container maxWidth = 'lg'>
          {(returnVal=='no results')&& <NullPage status = {true}/>}
          { menuData && <MenuBar menu = { oldMenuData } isChecked = { isChangeSearch }/> }
          {console.log("Product.js")}
          <div></div>
          { products && <ProdcutArea products = {products.slice((currentPage-1)*12,currentPage*12)}   />}
            <Grid container spacing={3} direction = "row" justify = "flex-end">
                <Grid item>
                  {products && <Pagination count={Math.ceil(products.length/12)} shape="rounded" page = {currentPage} onChange = {handleChange} />}
                </Grid>
            </Grid>
          <Footer/>
        </Container>
      }
    </React.Fragment>     
  );
}