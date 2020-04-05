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
  const { searchData,menu_Data, searchQuery} = useContext(SearchContext);

  // const [menu_Data, setMenu_Data] = useState({}); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);

  const [searchData_r, setSearchData_r] = searchData;
  const [searchQuery_r, setSearchQuery_r] = searchQuery;
  const [menu_Data_r, setMenu_Data_r] = menu_Data


  const handleChange = (event, value) => {
    setCurrentPage(value);
  };  

  return (
      <React.Fragment>
        <Header/>
        {console.log('This is searchQeury on the ProductPage ')}
        {console.log(searchQuery_r)};

        {console.log(searchQuery_r.toString())}

        {/* {!(searchData.result=="no results")? */}
        <div>
          {searchData_r==null?<Loading/>:(<Container maxWidth = 'lg'>
              {/* <MenuBar menu = {menu_Data_r.menu_Data}/> */}
              <div></div>
              {/* <ProdcutArea products = {searchData_r.products.slice((currentPage-1)*12,currentPage*12)}   /> */}
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
