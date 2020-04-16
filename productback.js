import React,{useState,useEffect,useContext} from 'react';
import ProductArea from '../../Components/ProductArea/ProductArea'
import MenuBar from '../../Components/MenuBar/MenuBar'
import Pagination from '@material-ui/lab/Pagination';
import { Grid, Typography } from '@material-ui/core';
import Header from '../../Components/Header/Header'
import Container from '@material-ui/core/Container'
import Footer from '../../Components/Footer/Footer'
import Loading from '../../Components/Loading/Loading'
import {SearchContext} from '../../Components/SearchBar/SearchBarContext'



const useFetchdata = (search) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    // Change the apiUrl according to the search string
   
    const apiUrl = `http://35.179.64.176/api/products?${search}`

   
    fetch(apiUrl)
      .then(res => res.json())
      .then(json => {
        setLoading(false)
        if (json.results) {

          setData(json);
         
        } else {
          setData(null)
        }
      })
      .catch(err => {
        // setError(err)
        // setLoading(false)
      })

  // This is important. We pass the new search parameter into
  // the empty array we had before. This means, the effect
  // will run again if this parameter changes
  }, [search])

  return { data, loading, error }
}

const BackendQuery = (queryParam)=>{
  // var keys = ['search_q','country','category','size','brand'];
  var keys = ['q','country','category','size','brand'];
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
  const {searchQuery} = useContext(SearchContext);
  const [searchQuery_r, setSearchQuery_r] = searchQuery;
  
  const { data, loading, error } = useFetchdata(BackendQuery(searchQuery_r));

      let menuData = null;
      let products = [];
      if (data!==null) {
        const [category] = data.category;
        const [size] = data.size;
        const [brand] = data.brand;
        const categoryData = category.map((label,index) => ({"key":'category'+index, "label":label,"selected":false,"menuKind":"category" }))
        const sizeData =  size.map((label,index) => ({"key":'size'+index, "label":label,"selected":false,"menuKind":"size" }))
        const brandData = brand.map((label,index) => ({"key":'brand'+index, "label":label,"selected":false,"menuKind":"brand" }));
        menuData = categoryData.concat(sizeData,brandData);
        products = data.products[0];

    }

  if (error) return <div>{error}</div>

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };  

  return (
      <React.Fragment>
        <Header/>
        {loading?<Loading/>:
         <Container maxWidth = 'lg'>
          {menuData&&<MenuBar menu = { menuData }/>}
          {console.log("Productback.js")}
        
          <div></div>
         {products&& <ProductArea products = {products.slice((currentPage-1)*12,currentPage*12)}/>}
            <Grid container spacing={3} direction = "row" justify = "flex-end">
                <Grid item>
                <Pagination count={Math.ceil(products.length/12)} shape="rounded" page = {currentPage} onChange = {handleChange} />
                </Grid>
            </Grid>
          <Footer/>
          </Container>
          }
          
           {/* <Container>
              <div style = {{height:'10vh'}}></div>
               <Typography>Your search for did not return any results.</Typography>
               <Typography variant = 'h4'>Search Tips</Typography>
               <ul>
                 <li> Try searching by product type, brand or description </li>
                 <li>Check your spelling</li>
                 <li>Broaden your search by using fewer or more general words</li>
               </ul>
             </Container> */}
      
      </React.Fragment>
        
  );
}