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

export default function Menu({menu}) {
  
  const [menuData, setmenuData] = useState(menu)

  console.log('This is menuy')
  console.log(menuData)
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
  const {searchQuery} = useContext(SearchContext);

  // const [searchData_r, setSearchData_r] = searchData;
  // // const [searchQuery_r, setSearchQuery_r] = searchQuery;

  
 const DeleteQueryItem =(value) =>{

  console.log("&&&&&&&&&&&&&*********Thsi is searchquery before delete")
  // console.log(searchQuery_r.toString());

  let url = new URL(window.location.href);
  let searchParams = new URLSearchParams(url.search.slice(1));
  let newSearchParams = new URLSearchParams();
  for(var pair of searchParams.entries()) {
    console.log(pair[0]+ ', '+ pair[1]); 
    if (pair[1].toLowerCase()!=value.toLowerCase()) {
      console.log(pair[1]);
      console.log(value);
      newSearchParams.append(pair[0],pair[1]);
    }
  }
  // setSearchQuery_r(newSearchParams);

  history.push({
    pathname: '/search',
    search: newSearchParams.toString().toLowerCase(),
  })

      console.log("&&&&&&&&&&&&&*Thsi is searchquery after delete")
      console.log(newSearchParams.toString());
 }
 
 const AddQueryItem =(key,value) =>{
    // searchQuery_r.append(key,value);
    let url = new URL(window.location.href);
    let newSearchQuery = new URLSearchParams(url.search.slice(1));
    newSearchQuery.append(key,value);
    history.push({
    pathname: '/search',
    search: newSearchQuery.toString().toLowerCase(),
  })

 }
  
  const handleChange = key=>{
    const newmenuData = [...menuData];
    newmenuData.find(category => category.key === key).selected = !newmenuData.find(category => category.key === key).selected;
    
    // Set menuData
    setmenuData(newmenuData);

    //Get menu name selected and get number of selected menu and if 0 then set the parent menu to uncheck.
    let menuName = newmenuData.find(category => category.key === key).menuKind;
    let numSelected =newmenuData.filter(category => category.menuKind === menuName).filter(item=>item.selected ===true).length;
    console.log(numSelected);
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

    // var query =menuData.filter(item => item.selected === true).map((item)=>({'key':item.menuKind,'value':item.label}))
    //   console.log('this is query')
    //   console.log(query)

    const query_key = newmenuData.find(category => category.key === key).menuKind;
    const query_value = newmenuData.find(category => category.key === key).label;
    const key_statue = newmenuData.find(category => category.key === key).selected;

    key_statue?AddQueryItem(query_key,query_value):DeleteQueryItem(query_value)
  }

  const handleDelete = (key) => () => {
   
    const newmenuData = [...menuData];
    newmenuData.find(v => v.key === key).selected = false;
    setmenuData(newmenuData);
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
                              {
                              
                              menuData.filter((item) => item.menuKind === 'category').map((item,index)=>(
                                <Grid xs = {12}>
                                  <FormControlLabel
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
                                  />
                                </Grid>
                                
                              ))
                            }
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
                              
                              menuData.filter((item) => item.menuKind === 'size').map((item,index)=>(
                                <Grid xs = {12}>
                                  <FormControlLabel
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
                                  />
                                </Grid>
                                
                              ))
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
                              
                              menuData.filter((item) => item.menuKind === 'brand').map((item,index)=>(
                                <Grid xs = {12}>
                                  <FormControlLabel
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
                                  />
                                </Grid>
                                
                              ))
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
                              
                              menuData.filter((item) => item.menuKind === 'sort').map((item,index)=>(
                                <Grid xs = {12}>
                                  <FormControlLabel
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
                                  />
                                </Grid>
                                
                              ))
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