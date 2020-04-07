import React ,{useState, createContext} from "react"

export const SearchContext = createContext();
export const SearchProvider = props=>{
  const init = new URLSearchParams("search_q=blue&country=United%20Kingdom");
  const [searchQuery,setSearchQuery] = useState(init);
  
    console.log('****search query On Context');
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