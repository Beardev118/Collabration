import React ,{useState, useContext, createContext } from "react"

export const SearchContext = createContext();

export const SearchProvider = props=>{
    const [searchQuery, setSearchQuery] = useState("");

    return(
        <SearchContext.Provider value = {[searchQuery,setSearchQuery]}>
            {props.children}
        </SearchContext.Provider>
    );
}

