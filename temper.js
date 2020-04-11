import { createContext, useState, useEffect } from 'react';
const context = createContext(null);
export default function UserProvider({ children }) {
  // The useState() hook defines a state variable.
  const [userData, setUserData] = useState(null);
  // The useEffect() hook registers a function to run after render.
  useEffect(() => {
    fetch('/api/v1/whoami')        // Ask the server for user data.
      .then(response => response.json()) // Get the response as JSON
      .then(data => {                    // When data arrives...
        setUserData({                    // set our state variable.
          username: data.username,
          isAuthenticated: data.is_authenticated,
          timezone: data.timezone,
          gravatarUrl: data.gravatar_url
        });
      });
  }, []);  // This empty array means the effect will only run once.
  // On the first render userData will have the default value null.
  // But after that render, the effect function will run and will
  // start a fetch of the real user data. When the data arrives, it
  // will be passed to setUserData(), which changes state and
  // triggers a new render. On this second render, we'll have real
  // user data to provide to any consumers. (And the effect will not
  // run again.)
  return (
    <context.Provider value={userData}>
      {children}
    </context.Provider>
  );
}
UserProvider.context = context;


const categoryData = categories.map((label,index) => ({"key":'category'+index, "label":label,"selected":false,"menuKind":"category" }))
const sizeData =  sizes.map((label,index) => ({"key":'size'+index, "label":label,"selected":false,"menuKind":"size" }))
const brandData = brands.map((label,index) => ({"key":'brand'+index, "label":label,"selected":false,"menuKind":"brand" }));
menu_Data_fetch = categoryData.concat(sizeData,brandData);
setMenuData({menu_Data:menu_Data_fetch});


useEffect(() => {
  let ignore = false;

  async function fetchProduct() {
    let result = null;
    const response = await fetch('http://192.168.1.229:3000/api/products?'+backendQuery);
    
    

    if (!ignore) {
    setProducts(item);
    }
  }

  fetchProduct();
  return () => { ignore = true };
}, []);


const useFetch = (url)=>{
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuData, setMenuData] = useState(null);
  const [returnVal, setReturnVal] = useState(null);
  
  useEffect(() => {
    let ignore = false;
    async function fetchData (){
      const response = await fetch(url);
      const data = await response.json();
      const [products] = data.products;
      const [categories] = data.category;
      const [sizes] = data.size;
      const [brands] = data.brand;
      const [result] = data.results;

      if (!ignore) {

        if (result =='ok') {
          const categoryData = categories.map((label,index) => ({"key":'category'+index, "label":label,"selected":false,"menuKind":"category" }))
          const sizeData =  sizes.map((label,index) => ({"key":'size'+index, "label":label,"selected":false,"menuKind":"size" }))
          const brandData = brands.map((label,index) => ({"key":'brand'+index, "label":label,"selected":false,"menuKind":"brand" }));
          const menu_Data_fetch = categoryData.concat(sizeData,brandData);
          setMenuData(menu_Data_fetch);
          setProducts(products);
          setLoading(false);
          setReturnVal(result);

        }else{
          setMenuData(null);
          setProducts(null);
          setLoading(false);
          setReturnVal(result);
        }
       
      }
    }
    fetchData();
    return () => { ignore = true };
  }, [url]);

  return {products,menuData,loading,returnVal};
}