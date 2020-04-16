import React ,{useState, createContext} from "react"

export const SearchContext = createContext();
export const SearchProvider = props=>{
  const init = new URLSearchParams();
  const [searchQuery,setSearchQuery] = useState(init);
  
    return(
        <SearchContext.Provider
        value={{searchQuery: [searchQuery, setSearchQuery]}}
         >   
            {props.children}
        </SearchContext.Provider>
    );
}

SearchProvider.context = SearchContext;