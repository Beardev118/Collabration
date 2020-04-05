import React ,{useState, useContext, createContext,useEffect } from "react"
import { Controller } from "react-hook-form";

export const SearchContext = createContext();

export const SearchProvider = props=>{
  // const init = new URLSearchParams('country=United%20Kingdom');
  const init = new URLSearchParams();

    const [searchQuery,setSearchQuery] = useState(init);
    const [searchData, setSearchData] = useState(null);
    const [menu_Data, setMenuData] = useState(null);  


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
      



    useEffect(() => {
        let ignore = false;
        let result = null;
        console.log('This is search Quesry on useEffect')
        console.log(searchQuery.toString());

        console.log('This is the GetBackendQuery function');  
        console.log(searchQuery);
        console.log(searchQuery.toString());
          var keys = ['search_q','country','category','size','brand'];
    
    
          var backendQuery = new URLSearchParams();
    
          for(var key of keys) { 
            if (searchQuery.getAll(key).length===0) {
              backendQuery.set(key,'null');
            }else{
              backendQuery.set(key,searchQuery.getAll(key).join('*'));
            }
          }
          

        
        async function fetchProduct() { 
          const response = await fetch('http://3.10.195.126:3000/products/search?'+backendQuery);
          const json = await response.json();
          const [item] = json.products;
          const [categories] = json.category;
          const [sizes] = json.size;
          const [brands] = json.brand;
          console.log(json.category);
          [result] = json.results;
          let menu_Data_fetch = null;
          if (result==='ok') {
            const categoryData = categories.map((label,index) => ({"key":'category'+index, "label":label,"selected":false,"menuKind":"category" }))
            const sizeData =  sizes.map((label,index) => ({"key":'size'+index, "label":label,"selected":false,"menuKind":"size" }))
            const brandData = brands.map((label,index) => ({"key":'brand'+index, "label":label,"selected":false,"menuKind":"brand" }));
            menu_Data_fetch = categoryData.concat(sizeData,brandData);
            console.log(menu_Data_fetch);
            setMenuData({menu_Data:menu_Data_fetch});
          }
          setSearchData(
            {
              products:item,
              result:result
            }
          )
          if (!ignore) {
        //   setProducts(item);
            console.log('This is prduct Data')
          }
        }
    
        fetchProduct();
        return () => { ignore = true };
      }, [searchQuery]);

      console.log('****search query On Context');
          // console.log(searchData);  
          // console..products
      console.log(searchQuery);
      console.log(searchQuery.toString());  


    return(
        <SearchContext.Provider
        value={{ searchData: [searchData, setSearchData],menu_Data:[menu_Data,setMenuData], searchQuery: [searchQuery, setSearchQuery]}}
         >   
            {props.children}
        </SearchContext.Provider>
    );
}

SearchProvider.context = SearchContext;