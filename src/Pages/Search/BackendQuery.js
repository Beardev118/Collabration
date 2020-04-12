
export const BackendQuery = (queryParam)=>{
    var keys = ['search_q','country','category','size','brand'];
  
    var searchQuery = queryParam.get('search_q');
    var country = queryParam.get('country');
    var category = queryParam.getAll('category');
    var size = queryParam.getAll('size');
    var brand = queryParam.getAll('brand');
  
    const query = {
      search_q: searchQuery,
      sort: JSON.stringify([]),
      range: JSON.stringify([0,60]),
      filter: JSON.stringify({
          "country":country,
          "category":category,
          "size":size,
          "brand":brand
      }),
    };
    var backendQuery = new URLSearchParams(query);
    return backendQuery.toString().toLocaleLowerCase();
  }