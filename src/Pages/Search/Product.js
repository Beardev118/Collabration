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

let prevQuery = null;

const useFetch = (search)=>{
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuData, setMenuData] = useState(null);
  const [returnVal, setReturnVal] = useState(null);
  
  useEffect(() => {
    let ignore = false;
    let url_out = new URL(window.location.href);
    let searchQuery_out = new URLSearchParams(url_out.search.slice(1));
    let curQuery = searchQuery_out.get('search_q');

    async function fetchData (){
      const url = `http://3.10.195.126:3000/products/search?${search}`
      const response = await fetch(url);
      const data = await response.json();
      const [products] = data.products;
      const [categories] = data.category;
      const [sizes] = data.size;
      const [brands] = data.brand;
      const [result] = data.results;
      console.log(prevQuery)
      console.log(curQuery);

      if (!ignore) {

        if (result =='ok') {
          if (prevQuery!==curQuery) {
            const categoryData = categories.map((label,index) => ({"key":'category'+index, "label":label,"selected":false,"menuKind":"category" }))
            const sizeData =  sizes.map((label,index) => ({"key":'size'+index, "label":label,"selected":false,"menuKind":"size" }))
            const brandData = brands.map((label,index) => ({"key":'brand'+index, "label":label,"selected":false,"menuKind":"brand" }));
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
    }
    fetchData();
    return () => { 
      ignore = true
      prevQuery = curQuery;
    };
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

  // console].log

  
  

  return (
      <React.Fragment>
        <Header/>

        {loading?<Loading/>:
         
          <Container maxWidth = 'lg'>
            {(returnVal=='no results')&& <NullPage status = {true}/>}
            {console.log(menuData)}
          {menuData&&<MenuBar menuData = {menuData}/>}
          <div></div>
        
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