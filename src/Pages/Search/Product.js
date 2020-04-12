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

let prevQuery = null;
let oldMenuData = null;

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
          
          setProducts(products);
          setLoading(false);
            setReturnVal(result);
        }else{
          setLoading(false);
          setReturnVal(result);
        }
       
      }
    }
    fetchData();
    return () => { 
      ignore = true
    
    };
  }, [search]);

  return {products,menuData,loading,returnVal};
}



export default function App() {

  const [currentPage, setCurrentPage] = useState(1);
  let url = new URL(window.location.href);
  let searchQuery = new URLSearchParams(url.search.slice(1));
  
  const {products,menuData, loading,returnVal} = useFetch(BackendQuery(searchQuery));
  let url_out = new URL(window.location.href);
  let searchQuery_out = new URLSearchParams(url_out.search.slice(1));
  let curQuery = searchQuery_out.get('search_q');

  if (prevQuery!==curQuery) {
    oldMenuData = menuData;
    prevQuery = curQuery;

  }
  
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
      <React.Fragment>
        <Header/>

        {loading?<Loading/>:
         
          <Container maxWidth = 'lg'>
            {console.log("This is result")}
            {console.log(returnVal)}
            {(returnVal=='no results')&& <NullPage status = {true}/>}
          {(prevQuery!==curQuery)?oldMenuData&&<MenuBar menuData = {oldMenuData}/>:menuData&&<MenuBar menuData = {menuData}/>}
          <div></div>
          {console.log('This is product out put')}
          {console.log(products)}
         {products&& <ProdcutArea products = {products.slice((currentPage-1)*12,currentPage*12)}   />}
            <Grid container spacing={3} direction = "row" justify = "flex-end">
                <Grid item>
               {products&&<Pagination count={Math.ceil(products.length/12)} shape="rounded" page = {currentPage} onChange = {handleChange} />}
                </Grid>
            </Grid>
          <Footer/>
          </Container>
        }
      </React.Fragment>
        
  );
}