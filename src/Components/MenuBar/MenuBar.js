import React,{useState,useEffect,useContext} from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Checkbox from '../CustomCheckbox/CustomCheckbox'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import { Container, Collapse, Box, Fade} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import {SearchContext} from '../../Components/SearchBar/SearchBarContext'
import {BackendQuery} from '../../Pages/Search/BackendQuery'

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
    transitionDuration:'1s',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  //IconButton Style
  IBtnRoot:{
    padding:0,
  },
  menuContainer:{
    boxShadow:'none',
    borderRadius:0,
    backgroundColor:'#EAEAEA'
  },
}));


const useFetchMenu = (search)=>{
  const [loading, setLoading] = useState(true);
  const [menuDataUpdated, setMenuData] = useState(null);
  const [returnVal, setReturnVal] = useState(null);
  
  useEffect(() => {
   

    async function fetchData (){
      const url = `http://192.168.1.229:3000/api/products?${search}`
      const response = await fetch(url);
      const data = await response.json();
      const [categories] = data.category;
      const [sizes] = data.size;
      const [brands] = data.brand;
      const [result] = data.results;


      if (result =='ok') {
       
        const categoryData = categories.map((label,index) => ({"key":'category'+index, "label":label,"selected":false,"menuKind":"category" ,"visible":true}))
        const sizeData =  sizes.map((label,index) => ({"key":'size'+index, "label":label,"selected":false,"menuKind":"size","visible":true }))
        const brandData = brands.map((label,index) => ({"key":'brand'+index, "label":label,"selected":false,"menuKind":"brand","visible":true }));
        const menu_Data_fetch = categoryData.concat(sizeData,brandData);
        setMenuData(menu_Data_fetch);

      
        setLoading(false);
        setReturnVal(result);
      }else{
        setLoading(true);
        setReturnVal(result);
      }
       
    }

    fetchData();
     
  }, [search]);

  return {menuDataUpdated,loading,returnVal};
}

export default function Menu({menuData}) {
  const [category, setcategory] = useState(false);
  const [size, setsize] = useState(false);
  const [brand, setbrand] = useState(false);
  const [sort, setsort] = useState(false);
  const [sizeCallaps, setsizeCallaps] = useState(false);
  const [brandCallaps, setbrandCallaps] = useState(false);
  const [sortCallaps, setsortCallaps] = useState(false);
  const [categoryCallaps, setcategoryCallaps] = useState(false);
  const [chipappear, setChipappear] = useState(true);
  const history = useHistory();
  const [menuQuery, setMenuQuery] = useState(new URLSearchParams());
  const [selectedMenu, setSelectedMenu] = useState(null);

  const  {menuDataUpdated,loading,returnVal} = useFetchMenu(BackendQuery(menuQuery));
  console.log(`http://192.168.1.229:3000/api/products?${BackendQuery(menuQuery)}`);
  
  console.log('************Selected menu');
  console.log(selectedMenu);

  // if(menuDataUpdated != null){
    
  //   menuData = menuDataUpdated&&menuData.map((item)=>{
  //     if(item.menuKind===selectedMenu.menu){
  //       return item;
  //     }else{
  //       if (menuDataUpdated.some(obj=>obj.label===item.label)) {
  //         return selectedMenu.checked?{...item, 'visible':true}:{...item, 'visible':false};
  //       } else {
  //         return selectedMenu.checked?{...item, 'visible':false}:{...item, 'visible':true};
  //       }
  //     }
  //   });
  // }

  
  
  
  const DeleteQueryItem =(key,value) =>{
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search.slice(1));
    let newSearchParams = new URLSearchParams();
    let country = searchParams.get('country');
    let search_q = searchParams.get('search_q');
    let menuSearchQuery = new URLSearchParams();

    menuSearchQuery.set('country',country);
    menuSearchQuery.set('search_q',search_q);
    for(var pair of searchParams.entries()) {
      if (pair[1].toLowerCase()!=value.toLowerCase()) {
        newSearchParams.append(pair[0],pair[1]);
        if (pair[0]==key) {
          menuSearchQuery.append(pair[0],pair[1]);
        }
      }else{
        
        setSelectedMenu({menu:pair[0],checked:false})
      }
    }

    history.push({
      pathname: '/search',
      search: newSearchParams.toString().toLowerCase(),
    })

    setMenuQuery(menuSearchQuery);


  }
 
  const AddQueryItem =(key,value) =>{

    let url = new URL(window.location.href);
    let newSearchQuery = new URLSearchParams(url.search.slice(1));
    newSearchQuery.append(key,value);
    history.push({
      pathname: '/search',
      search: newSearchQuery.toString().toLowerCase(),
    })

    //Make the query for fetching the menuData for selected menu.
    const menuArray = ['category','size','brand'];
    for(var i=0;i<3;i++){
      if (menuArray[i]!==key) {
        newSearchQuery.delete(menuArray[i]);
      }
    }
    setMenuQuery(newSearchQuery);
    
  }


  
  const handleChange = key=>{
    const newmenuData = [...menuData];
  
   
    newmenuData.find(category => category.key === key).selected = !newmenuData.find(category => category.key === key).selected;
    
    // Set menuData
    // setmenuData(newmenuData);
    menuData = newmenuData;

    //Get menu name selected and get number of selected menu and if 0 then set the parent menu to uncheck.
    let menuName = newmenuData.find(category => category.key === key).menuKind;
    let numSelected =newmenuData.filter(category => category.menuKind === menuName).filter(item=>item.selected ===true).length;
    if (menuName === "category") {
      numSelected===0?setcategory(false):setcategory(true);
    } else if(menuName === "size")
    {
      numSelected===0?setsize(false):setsize(true);
    } else if(menuName === "brand")
    {
      numSelected===0?setbrand(false):setbrand(true);
    } else if(menuName === "sort")
    {
      numSelected===0?setsort(false): setsort(true);
    }

    if (category||size||brand||sort) {
      setChipappear(true);
    }
    else{
      setChipappear(false)
    }

    const query_key = newmenuData.find(category => category.key === key).menuKind;
    const query_value = newmenuData.find(category => category.key === key).label;
    const key_statue = newmenuData.find(category => category.key === key).selected;

    setSelectedMenu({menu:query_key,checked:true});

    key_statue?AddQueryItem(query_key,query_value):DeleteQueryItem(query_key,query_value)

  }

  const handleDelete = (key) => () => {
   
    const newmenuData = [...menuData];
    newmenuData.find(v => v.key === key).selected = false;
    // setmenuData(newmenuData);
    menuData = newmenuData;
    var menuName = newmenuData.find(category => category.key === key).menuKind;
    var numSelected =newmenuData.filter(category => category.menuKind === menuName).filter(item=>item.selected ===true).length
    if (menuName === "category") {
      numSelected===0?setcategory(false):setcategory(true);
    } else if(menuName === "size")
    {
      numSelected===0?setsize(false):setsize(true);
    } else if(menuName === "brand")
    {
      numSelected===0?setbrand(false):setbrand(true);
    } else if(menuName === "sort")
    {
      numSelected===0?setsort(false): setsort(true);
    }

    const query_value = newmenuData.find(category => category.key === key).label;
    DeleteQueryItem(query_value); 
  };

  const closeColapse = ()=>{
    setcategoryCallaps(false);
    setsizeCallaps(false);
    setbrandCallaps(false);
    setsortCallaps(false);
}

  // const handleChangeMenuCheck = e=>{
  //   setcategory(!category);
  //   var newmenuData =  menuData.map(category => category.menuKind === e.target.name?{ ...category, selected: true }:category);
  //   setmenuData(newmenuData);
  // }

const matches = useMediaQuery('(min-width:600px)');
  const toggleCollapse = (menuName)=>e=>{
    if (!matches) {
      if (menuName === "category") {
        setcategoryCallaps(!categoryCallaps);
        setsizeCallaps(false);
        setbrandCallaps(false);
        setsortCallaps(false);
      }
      if (menuName === "size") {
        setcategoryCallaps(false);
        setsizeCallaps(!sizeCallaps);
        setbrandCallaps(false);
        setsortCallaps(false);
      }
      if (menuName === "brand") {
        setcategoryCallaps(false);
        setsizeCallaps(false);
        setbrandCallaps(!brandCallaps);
        setsortCallaps(false);
      }
      if (menuName === "sort") {
        setcategoryCallaps(false);
        setsizeCallaps(false);
        setbrandCallaps(false);
        setsortCallaps(!sortCallaps);
      }
    }else{
      setcategoryCallaps(!categoryCallaps);
      setsizeCallaps(!categoryCallaps);
      setbrandCallaps(!categoryCallaps);
      setsortCallaps(!categoryCallaps);
      }
      

      
    }
  
  const classes = useStyles();
  
  return (
          <div>
          {/* {loading&& */}
          <ClickAwayListener onClickAway = {closeColapse}>
          <Container maxWidth = "lg" style = {{marginTop:"50px"}}>
            <Paper  className = {classes.menuContainer}>
            
              <Grid xs = {12} md = {12}>
              <Paper  className = {classes.menuContainer}>
                          {/* {
                          menuData.map(data => {
                            let icon;

                            if (data.selected === true) {
                              return (
                                <Chip
                                  key={data.key}
                                  icon={icon}
                                  label={data.label}
                                  onDelete={handleDelete(data.key)}
                                  className={classes.chip}
                                  outlined
                                />
                              );
                            }
                          })} */}
                    </Paper>
                  </Grid>

                  {/* <Divider variant = "middle" style = {{visibility:false}} /> */}
            <Grid container xs = {12} >
            <Grid item xs = {12} md = {2}>
              <Box ml = {2}style = {{marginTop:'12px'}}>
                <Typography variant = "h6"  component = "h2">
                  Refine your search  
                </Typography>
              </Box>
                  
              </Grid>
              <Grid container xs = {12} md = {2}>
                  <Grid item >
                    <Checkbox
                    checked ={category}
                    name = "category" 
                    disableRipple
                    disableFocusRipple
                    />
                      <Button onClick = {toggleCollapse('category')}>category</Button>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: categoryCallaps,
                        })}
                        onClick={toggleCollapse('category')}
                        aria-categoryCallaps={categoryCallaps}
                        aria-label="show more"
                        classes={{
                          root: classes.IBtnRoot, 
                        }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>


                      <Collapse in = {categoryCallaps} timeout = {1000}>
                      <GridList cellHeight = {40} spacing = {1} style = {{maxHeight:'30vh',paddingLeft:"20px",marginBottom:"10px",marginTop:'10px '}}>
                            {<>
                                {
                                    menuData&&menuData.filter((item) => item.menuKind === 'category').map((item,index)=>(
                                      <>{item.label&&<Grid xs = {12}>
                                       {item.visible&&<FormControlLabel
                                          control={
                                            <Checkbox
                                              key = {item.key}
                                              checked={item.selected}
                                              onChange={()=>handleChange(item.key)}
                                              name={item.label}
                                              color="primary"
                                            />
                                          }
                                          label={item.label}
                                        />}
                                      
                                      </Grid>}</>
                                      
                                    ))
                                }
                            
                          </>}
                        </GridList>
                        </Collapse>

                  </Grid>
               </Grid> 
              <Grid container xs = {12} md = {2}>
                  <Grid item >
                    <Checkbox
                    checked ={size}
                    name = "size" 
                    disableRipple
                    disableFocusRipple
                    />
                      <Button onClick = {toggleCollapse('size')}>size</Button>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: sizeCallaps,
                        })}
                        onClick={toggleCollapse('size')}
                        aria-sizeCallaps={sizeCallaps}
                        aria-label="show more"
                        classes={{
                          root: classes.IBtnRoot, 
                        }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>


                      <Collapse in = {sizeCallaps} timeout = {1000}>
                      <GridList cellHeight = {40} spacing = {1} style = {{maxHeight:'30vh',paddingLeft:"20px",marginBottom:"10px",marginTop:'10px '}}>
                            {
                            <>
                            {
                                menuData&&menuData.filter((item) => item.menuKind === 'size').map((item,index)=>(
                                  <>{item.label&&<Grid xs = {12}>
                                   {item.visible&&<FormControlLabel
                                      control={
                                        <Checkbox
                                          key = {item.key}
                                          checked={item.selected}
                                          onChange={()=>handleChange(item.key)}
                                          name={item.label}
                                          color="primary"
                                        />
                                      }
                                      label={item.label}
                                    />}
                                  </Grid>}</>
                                  
                                ))
                            }
                            </>
                           
                          }
                        </GridList>
                        </Collapse>

                  </Grid>
               </Grid>              
              
               <Grid container xs = {12} md = {2}>
                  <Grid item >
                    <Checkbox
                    checked ={brand}
                    name = "brand" 
                    disableRipple
                    disableFocusRipple
                    />
                        <Button onClick = {toggleCollapse('brand')}>brand</Button>
                        <IconButton
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: brandCallaps,
                          })}
                          onClick={toggleCollapse('brand')}
                          aria-brandCallaps={brandCallaps}
                          aria-label="show more"
                          classes={{
                            root: classes.IBtnRoot, 
                          }}
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      <Collapse in = {brandCallaps} timeout = {1000}>
                      <GridList cellHeight = {35} spacing = {1} style = {{maxHeight:'30vh',paddingLeft:"30px",marginTop:'10px'}}>
                            {
                              <>{
                                menuData&&menuData.filter((item) => item.menuKind === 'brand').map((item,index)=>(
                                  <>{item.label&&<Grid xs = {12}>
                                   {item.visible&&<FormControlLabel
                                      control={
                                        <Checkbox
                                          key = {item.key}
                                          checked={item.selected}
                                          onChange={()=>handleChange(item.key)}
                                          name={item.label}
                                          color="primary"
                                        />
                                      }
                                      label={item.label}
                                    />}
                                  </Grid>}</>
                                  
                                ))
                              }
                              </>
                            
                            
                          }
                        </GridList>
                        </Collapse>

                  </Grid>
               </Grid> 
               <Grid container xs = {12} md = {2}>
                  <Grid item >
                    <Checkbox
                    checked ={sort}
                    name = "sort" 
                    disableRipple
                    disableFocusRipple
                    />
                      <Button onClick = {toggleCollapse('sort')}>sort By</Button>
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: sortCallaps,
                        })}
                        onClick={toggleCollapse('sort')}
                        aria-sortCallaps={sortCallaps}
                        aria-label="show more"
                        classes={{
                          root: classes.IBtnRoot, 
                        }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>


                      <Collapse in = {sortCallaps} timeout = {1000}>
                      <GridList cellHeight = {35} spacing = {1} style = {{maxHeight:'30vh',paddingLeft:"30px",marginTop:'10px'}}>
                            {
                            <>{
                              menuData&&menuData.filter((item) => item.menuKind === 'sort').map((item,index)=>(
                                <>{item.label&&<Grid xs = {12}>
                                 {item.visible&&<FormControlLabel
                                    control={
                                      <Checkbox
                                        key = {item.key}
                                        checked={item.selected}
                                        onChange={()=>handleChange(item.key)}
                                        name={item.label}
                                        color="primary"
                                      />
                                    }
                                    label={item.label}
                                  />}
                                </Grid>}</>
                                
                              ))
                            }
                            </>
                           
                          }
                        </GridList>
                        </Collapse>

                  </Grid>
               </Grid> 
            </Grid>
            </Paper>
          </Container>
          </ClickAwayListener>
          
             
          </div>
  )
}

Menu.prototype = {
  menuData: PropTypes.array,
}