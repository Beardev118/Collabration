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

  // const [products, setProducts] = useState(null);
  const {searchQuery} = useContext(SearchContext);

  // const [menu_Data, setMenu_Data] = useState({}); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);

  // const [searchData_r, setSearchData_r] = searchData;
  const [searchQuery_r, setSearchQuery_r] = searchQuery;
  const [searchData, setSearchData] = useState(null);
  const [menu_Data, setMenuData] = useState(null);  


  useEffect(() => {
    let ignore = false;
    let result = null;
    console.log('This is search Quesry on useEffect')
    console.log(searchQuery_r.toString());

    console.log('This is the GetBackendQuery function');  
    console.log(searchQuery_r);
    console.log(searchQuery_r.toString());
      var keys = ['search_q','country','category','size','brand'];


      var backendQuery = new URLSearchParams();

      for(var key of keys) { 
        if (searchQuery_r.getAll(key).length===0) {
          backendQuery.set(key,'null');
        }else{
          backendQuery.set(key,searchQuery_r.getAll(key).join('*'));
        }
      }
    
    async function fetchProduct() { 
      const response = await fetch('http://3.10.195.126:3000/products/search?'+backendQuery);
      const json = await response.json();
      const [item] = json.products;
      const [categories] = json.category;
      const [sizes] = json.size;
      const [brands] = json.brand;
      [result] = json.results;
      let menu_Data_fetch = null;
      if (result==='ok') {
        const categoryData = categories.map((label,index) => ({"key":'category'+index, "label":label,"selected":false,"menuKind":"category" }))
        const sizeData =  sizes.map((label,index) => ({"key":'size'+index, "label":label,"selected":false,"menuKind":"size" }))
        const brandData = brands.map((label,index) => ({"key":'brand'+index, "label":label,"selected":false,"menuKind":"brand" }));
        menu_Data_fetch = categoryData.concat(sizeData,brandData);
        setMenuData({menu_Data:menu_Data_fetch});
      }
      console.log('This is menu data')
      console.log(menu_Data_fetch);
      if (!ignore) {
          setSearchData(
          {
            products:item,
            result:result
          }
        )
        console.log('This is prduct Data')
      }
    }

    fetchProduct();
    return () => { ignore = true };
  }, [searchQuery_r]);

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };  



  return (
      <React.Fragment>
        <Header/>
        {console.log('This is searchQeury on the ProductPage ')}
        {console.log(searchQuery_r)};
        {console.log(searchQuery_r.toString())};


        {/* {!(searchData.result=="no results")? */}
        <div>
          {searchData==(null||undefined)?<Loading/>:(<Container maxWidth = 'lg'>
              {/* <MenuBar menu = {menu_Data.menu_Data}/> */}
              <div></div>
              {/* <ProdcutArea products = {searchData.products.slice((currentPage-1)*12,currentPage*12)}   /> */}
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
