const getBackenQuery = (url_query)=>{
    
    let backendQuery = new URLSearchParams();
    let searchTerm = url_query.get('q')
    let country = url_query.get('Country')
    if(country == null){
        country = "null";
    }
    let arr_category = url_query.getAll('Category')
    let arr_brand = url_query.getAll('Brand')
    let arr_size =  url_query.getAll('Size')
    
    let q_size = null;
    arr_size.forEach(element => {
        q_size =q_size+element+'*';
    });
    
    let q_category = null;
    arr_category.forEach(element => {
        q_category =q_category+element+'*';
    });
    let q_brand = null;
    arr_brand.forEach(element => {
        q_brand =q_brand+element+'*';
    });

    backendQuery.set('search_q',searchTerm);
    backendQuery.set('country',country);
    backendQuery.set('category',q_category);
    backendQuery.set('size',q_size);
    backendQuery.set('brand',q_brand);
    return backendQuery.toString(); 
  }

