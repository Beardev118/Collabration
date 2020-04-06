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
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let ignore = false;
    async function fetchData (){
      const response = await fetch(url);
      const data = await response.json();
      const [item] = data.products;

      console.log('This is Fetch');
      if (!ignore) {
        setData(item);
        setLoading(false);
      }
    }
    fetchData();
    return () => { ignore = true };
  }, [url]);

  return {data,loading};
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
  const [searchData, setSearchData] = useState(null);
  const [menu_Data, setMenuData] = useState(null);  

  console.log('http://3.10.195.126:3000/products/search?'+BackendQuery(searchQuery_r));
  const{data, loading} = useFetch('http://3.10.195.126:3000/products/search?'+BackendQuery(searchQuery_r));
     
  console.log('Thsi is test')
  console.log(data);

    const handleChange = (event, value) => {
    setCurrentPage(value);
  };  

  return (
      <React.Fragment>
        <Header/>
        {console.log('This is searchQeury on the ProductPage ')}
        {console.log(searchQuery_r.toString())};

        {/* {!(searchData.result=="no results")? */}
        <div>
          {loading?<Loading/>:(<Container maxWidth = 'lg'>

              {/* <MenuBar menu = {menu_Data.menu_Data}/> */}
              <div></div>
              <ProdcutArea products = {data.slice((currentPage-1)*12,currentPage*12)}   />
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
