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

const useFetch = (url)=>{
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuData, setMenuData] = useState(null);
  const [returnVal, setReturnVal] = useState(null);
  
  useEffect(() => {
    let ignore = false;
    async function fetchData (){
      const response = await fetch(url);
      const data = await response.json();
      const [products] = data.products;
      const [categories] = data.category;
      const [sizes] = data.size;
      const [brands] = data.brand;
      const [result] = data.results;

      console.log('Thsi is resullt'+result);

      console.log('This is Fetch');
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
          setMenuData(null);
          setProducts(null);
          setLoading(false);
          setReturnVal(result);
        }
        

       
      }
    }
    fetchData();
    return () => { ignore = true };
  }, [url]);

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

  // const [products, setProducts] = useState(null);
  const {searchQuery} = useContext(SearchContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [searchQuery_r, setSearchQuery_r] = searchQuery;

  console.log('http://192.168.1.229:3000/products/search?'+BackendQuery(searchQuery_r));
  const{products,menuData, loading,returnVal} = useFetch('http://192.168.1.229:3000/products/search?'+BackendQuery(searchQuery_r));
     
  console.log('Thsi is test')
  console.log(menuData);

    const handleChange = (event, value) => {
    setCurrentPage(value);
  };  

  return (
      <React.Fragment>
        <Header/>
        {loading?<Loading/>:
          (returnVal=='ok')?<Container maxWidth = 'lg'>

          {menuData&&<MenuBar menu = {menuData}/>}
          <div></div>
         {products&& <ProdcutArea products = {products.slice((currentPage-1)*12,currentPage*12)}   />}
            <Grid container spacing={3} direction = "row" justify = "flex-end">
                <Grid item>
                <Pagination count={totalPage} shape="rounded" page = {currentPage} onChange = {handleChange} />
                </Grid>
            </Grid>
          <Footer/>
          </Container>:<Container>
             <div style = {{height:'10vh'}}></div>
              <Typography>Your search for did not return any results.</Typography>
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
