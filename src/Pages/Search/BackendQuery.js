
export const BackendQuery = (queryParam, cnt)=>{
    // var searchQuery = queryParam.get('search_q');
    let searchQuery = queryParam.get('q');
    let country = queryParam.get('country');
    if(country == null){
      country = "null";
    }
    let category = queryParam.getAll('category');
    let size = queryParam.getAll('size');
    let brand = queryParam.getAll('brand');
    let sortkey = queryParam.getAll('sort');
  
    const query = {
      search_q: searchQuery,
      sort: sortkey == "desc" ? JSON.stringify(["price", "DESC"]):JSON.stringify(["price", "ASC"]),
      range: JSON.stringify([0, cnt]),
      filter: JSON.stringify({
          "country":country,
          "category":category,
          "size":size,
          "brand":brand
      }),
    };
    let backendQuery = new URLSearchParams();
    if(searchQuery != null)
      backendQuery = new URLSearchParams(query);
    return backendQuery.toString().toLocaleLowerCase();
  }