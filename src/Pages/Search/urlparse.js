const getBackenQuery = (url_query)=>{
    
    let backendQuery = new URLSearchParams();
    var searchTerm = url_query.get('q')
    var country = url_query.get('Country')
    var arr_category = url_query.getAll('Category')
    var arr_brand = url_query.getAll('Brand')
    var arr_size =  url_query.getAll('Size')
    
    var  q_size = null;
    arr_size.forEach(element => {
        q_size =q_size+element+'*';
    });
    
    var q_category = null;
    arr_category.forEach(element => {
        q_category =q_category+element+'*';
    });
    var q_brand = null;
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

