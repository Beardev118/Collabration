import React,{useState,useEffect} from 'react';
import ProductArea from '../../Components/ProductArea/ProductArea'
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
  const [totalCnt, setTotalCnt] = useState(0);
  const [isQueryChanged, setIsQueryChanged] = useState(false);
  
  useEffect(() => {
    let ignore = false;
    async function fetchData (){
      const url = `http://35.179.64.176/api/products?${search}`
      const response = await fetch(url);
      const data = await response.json();
      const products = data.products;
      const [categories] = data.category;
      const [sizes] = data.size;
      const [brands] = data.brand;
      const [result] = data.results;
      const [totalCnt] = data.total;

      if (!ignore) {

        if (result =='ok' || result == 'no') {
          const categoryData = categories.map((label,index) => ({"key":'category'+index, "label":label,"selected":false,"menuKind":"category","visible":true }))
          const sizeData =  sizes.map((label,index) => ({"key":'size'+index, "label":label,"selected":false,"menuKind":"size","visible":true }))
          const brandData = brands.map((label,index) => ({"key":'brand'+index, "label":label,"selected":false,"menuKind":"brand","visible":true }));
          const menu_Data_fetch = categoryData.concat(sizeData,brandData);
          setMenuData(menu_Data_fetch);
        }
        setProducts(products);
        setLoading(false);
        setReturnVal(result);
        setTotalCnt(totalCnt);
      }else{
        setLoading(false);
        setReturnVal(result);
        setTotalCnt(totalCnt);
      }
    }

    fetchData();

    return () => { 
      ignore = true;
      setIsQueryChanged(!isQueryChanged);
    };
  }, [search]);

  return { products , menuData, loading, returnVal, totalCnt, isQueryChanged};
}

let prevQuery = null;
let oldMenuData = null;
let isChangeSearch = true;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [flag, setFlag] = useState(false);
  let url = new URL(window.location.href);
  let searchQuery = new URLSearchParams(url.search.slice(1));
  let currQuery = searchQuery.get('q');
  let currcountry = searchQuery.get('country');
  let currcategory = searchQuery.get('category');
  let currsize = searchQuery.get('size');
  let currbrand = searchQuery.get('brand');

  if ((currcountry != null) | (currcategory != null) | (currsize != null) | (currbrand != null)) {
    prevQuery = currQuery;
    isChangeSearch = false;
  } else {
    prevQuery = currQuery;
    isChangeSearch = true;
  }

  const {products, menuData, loading, returnVal, totalCnt, isQueryChanged} = useFetch(BackendQuery(searchQuery, 0));

  if(flag != isQueryChanged){
    setCurrentPage(1);
    setFlag(isQueryChanged);
  }
  if(isChangeSearch){
    oldMenuData = menuData;
  }
  
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <React.Fragment>
      <Header/>

      {loading?<Loading/>:
        
        <Container maxWidth = 'lg'>
          {(returnVal == 'no results' || returnVal == 'no') && <NullPage status = {true}/>}
      { menuData && <MenuBar menu = { oldMenuData } isChecked = { isChangeSearch } isResult = { returnVal }/> } 
          <div></div>
          { products && <ProductArea products = { products.slice((currentPage-1)*12, currentPage*12)}   />}
            <Grid container spacing={3} direction = "row" justify = "flex-end">
                <Grid item>
                  { products && <Pagination count={ Math.ceil(totalCnt/12) } shape="rounded" page = { currentPage } onChange = { handleChange } />}
                </Grid>
            </Grid>
          <Footer/>
        </Container>
      }
    </React.Fragment>     
  );
}