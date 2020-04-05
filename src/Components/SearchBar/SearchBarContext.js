import React ,{useState, useContext, createContext,useEffect } from "react"
import { Controller } from "react-hook-form";

export const SearchContext = createContext();

export const SearchProvider = props=>{
  // const init = new URLSearchParams('country=United%20Kingdom');
  const init = new URLSearchParams();

    const [searchQuery,setSearchQuery] = useState(init);
   


    // const  GetBackenQuery = (searchParams)=>{
    //   console.log('This is the GetBackendQuery function');  
    //   console.log(searchParams);
    //   console.log(searchParams.toString());
    //     var keys = ['search_q','country','category','size','brand'];
  
  
    //     var backendQuery = new URLSearchParams();
  
    //     for(var key of keys) { 
    //       if (searchParams.getAll(key).length===0) {
    //         backendQuery.set(key,'null');
    //       }else{
    //         backendQuery.set(key,searchParams.getAll(key).join('*'));
    //       }
          
    //       console.log(key);
    //       console.log(backendQuery.toString()) ;
    //     }
    //     return backendQuery.toString();
    //   }
      



    
      console.log('****search query On Context');
          // console.log(searchData);  
          // console..products
      console.log(searchQuery);
      console.log(searchQuery.toString());  


    return(
        <SearchContext.Provider
        value={{searchQuery: [searchQuery, setSearchQuery]}}
         >   
            {props.children}
        </SearchContext.Provider>
    );
}

SearchProvider.context = SearchContext;