import React,{useState,useEffect} from "react";
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


export default function Menu(props) {
  
  const [menuData, setmenuData] = useState(props.menu)
  console.log("This is menubar")
  console.log(menuData);

    useEffect(() => {
        setmenuData(props.menu);
    }, [props.menu])


  const [category, setCategory] = useState(false);
  const [size, setSize] = useState(false);
  const [brand, setBrand] = useState(false);
  const [sort, setSort] = useState(false);
  const [sizeCallaps, setSizeCallaps] = useState(false);
  const [brandCallaps, setBrandCallaps] = useState(false);
  const [sortCallaps, setSortCallaps] = useState(false);
  const [categoryCallaps, setCategoryCallaps] = useState(false);
  const [hrVisible, setHrVisible] = useState(false);
  const [chipappear, setChipappear] = useState(true);
  const history = useHistory()
  
  const handleChange = key=>{
    const newmenuData = [...menuData];
    newmenuData.find(category => category.key === key).selected = !newmenuData.find(category => category.key === key).selected;
    
    // Set menuData
    setmenuData(newmenuData);

    //Get menu name selected and get number of selected menu and if 0 then set the parent menu to uncheck.
    var menuName = newmenuData.find(category => category.key === key).menuKind;
    var numSelected =newmenuData.filter(category => category.menuKind === menuName).filter(item=>item.selected ===true).length
    console.log(numSelected);
    if (menuName === "Category") {
      numSelected===0?setCategory(false):setCategory(true);
    } else if(menuName === "Size")
    {
      numSelected===0?setSize(false):setSize(true);
    } else if(menuName === "Brand")
    {
      numSelected===0?setBrand(false):setBrand(true);
    } else if(menuName === "Sort")
    {
      numSelected===0?setSort(false): setSort(true);
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

    let search = window.location.search;
    let params = new URLSearchParams(search);
    params.append(query_key,query_value); 
    history.push({
      pathname: '/search',
      search: params.toString()
    })
    window.location.reload(false);
  }

  const handleDelete = (key) => () => {
   
    const newmenuData = [...menuData];
    newmenuData.find(v => v.key === key).selected = false;
    setmenuData(newmenuData);
    var menuName = newmenuData.find(category => category.key === key).menuKind;
    var numSelected =newmenuData.filter(category => category.menuKind === menuName).filter(item=>item.selected ===true).length
    console.log(numSelected);
    if (menuName === "Category") {
      numSelected===0?setCategory(false):setCategory(true);
    } else if(menuName === "Size")
    {
      numSelected===0?setSize(false):setSize(true);
    } else if(menuName === "Brand")
    {
      numSelected===0?setBrand(false):setBrand(true);
    } else if(menuName === "Sort")
    {
      numSelected===0?setSort(false): setSort(true);
    }

  };

  const closeColapse = ()=>{
    setCategoryCallaps(false);
    setSizeCallaps(false);
    setBrandCallaps(false);
    setSortCallaps(false);
}

  // const handleChangeMenuCheck = e=>{
  //   setCategory(!category);
  //   var newmenuData =  menuData.map(category => category.menuKind === e.target.name?{ ...category, selected: true }:category);
  //   setmenuData(newmenuData);

  // }

const matches = useMediaQuery('(min-width:600px)');
  const toggleCollapse = (menuName)=>e=>{
    console.log(matches);
    if (!matches) {
      if (menuName === "Category") {
        setCategoryCallaps(!categoryCallaps);
        setSizeCallaps(false);
        setBrandCallaps(false);
        setSortCallaps(false);
      }
      if (menuName === "Size") {
        setCategoryCallaps(false);
        setSizeCallaps(!sizeCallaps);
        setBrandCallaps(false);
        setSortCallaps(false);
      }
      if (menuName === "Brand") {
        setCategoryCallaps(false);
        setSizeCallaps(false);
        setBrandCallaps(!brandCallaps);
        setSortCallaps(false);
      }
      if (menuName === "Sort") {
        setCategoryCallaps(false);
        setSizeCallaps(false);
        setBrandCallaps(false);
        setSortCallaps(!sortCallaps);
      }
    }else{
      setCategoryCallaps(!categoryCallaps);
      setSizeCallaps(!categoryCallaps);
      setBrandCallaps(!categoryCallaps);
      setSortCallaps(!categoryCallaps);
      }
      

      
    }
  
  const classes = useStyles();
  
  return (
          <div>
            {console.log(menuData)}
             <ClickAwayListener onClickAway = {closeColapse}>
            <Container maxWidth = "lg" style = {{marginTop:"50px"}}>
              <Paper  className = {classes.menuContainer}>
              
                <Grid xs = {12} md = {12}>
                <Paper  className = {classes.menuContainer}>
                          {/* <Paper className={classes.root}> */}
                            {
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
                            })}
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
                      name = "Category" 
                      disableRipple
                      disableFocusRipple
                      />
                        <Button onClick = {toggleCollapse('Category')}>Category</Button>
                        <IconButton
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: categoryCallaps,
                          })}
                          onClick={toggleCollapse('Category')}
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
                              
                              menuData.filter((item) => item.menuKind === 'Category').map((item,index)=>(
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
                      name = "Size" 
                      disableRipple
                      disableFocusRipple
                      />
                        <Button onClick = {toggleCollapse('Size')}>Size</Button>
                        <IconButton
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: sizeCallaps,
                          })}
                          onClick={toggleCollapse('Size')}
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
                              
                              menuData.filter((item) => item.menuKind === 'Size').map((item,index)=>(
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
                      name = "Brand" 
                      disableRipple
                      disableFocusRipple
                      />
                          <Button onClick = {toggleCollapse('Brand')}>Brand</Button>
                          <IconButton
                            className={clsx(classes.expand, {
                              [classes.expandOpen]: brandCallaps,
                            })}
                            onClick={toggleCollapse('Brand')}
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
                              
                              menuData.filter((item) => item.menuKind === 'Brand').map((item,index)=>(
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
                      name = "Sort" 
                      disableRipple
                      disableFocusRipple
                      />
                        <Button onClick = {toggleCollapse('Sort')}>Sort By</Button>
                        <IconButton
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: sortCallaps,
                          })}
                          onClick={toggleCollapse('Sort')}
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
                              
                              menuData.filter((item) => item.menuKind === 'Sort').map((item,index)=>(
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