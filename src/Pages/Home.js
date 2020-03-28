import React from 'react';
import Header from '../Components/Header/Header'
import SearchBar from '../Components/SearchBar/SearchBar'
export default function Home(){
  return(
      // <Container maxWidth ="sm" style = {{ minHeight: '100vh'}} >
    <React.Fragment>
            <Header/>
              <div style = {{height:"30vh"}}></div>
            <SearchBar/>
    </React.Fragment>
      
  );

}
