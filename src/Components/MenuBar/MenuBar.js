import React,{useState} from "react";
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
// import Checkbox from '../Checkbox/Checkbox'
import ExpandLess from "../../asset/img/arrow_down.png";
import ExpandMore from "../../asset/img/arrow_up.png";
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {theme} from '@material-ui/core/styles'




import { makeStyles } from '@material-ui/core/styles';

import { Typography, Collapse, Hidden } from "@material-ui/core";
// import ContrySelector from './CountrySelector';


import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const innertheme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        borderRadius: 0,
        border: 0,
        color: 'black',
        fontFamily:'Arial',
        fontSize:'10px',
        fontWeight:'bold',
        paddingRight:'20px',
       paddingLeft:'10px',

        
      },

      submenu: {
        borderRadius: "0px",
        width:'100%',
        height:300
      }
      
    },
    MuiCheckbox:{
      disableRipple:"none",
      color:"default",
      root: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
      
      icon: {
        borderRadius: 3,
        width: 5,
        height: 5,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        // backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
          outline: '2px auto #1A1919',
          outlineOffset: 2,
        },
        'input:hover ~ &': {
          backgroundColor: '#4A4A4A',
        },
        'input:disabled ~ &': {
          boxShadow: 'none',
          background: 'rgba(206,217,224,.5)',
        },
      },
      checkedIcon: {
        backgroundColor: '#FF0000',
        // backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
          display: 'block',
          width: 16,
          height: 16,
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
          content: '""',
        },
        'input:hover ~ &': {
          backgroundColor: '#4A4A4A',
        },
      },

    }

  },
});


const useStyles = makeStyles(theme => ({
   
  menubar:{
      display:'flex',
      width:'100%',
      backgroundColor:'#EAEAEA',
      margin: 'auto',
      marginTop:'70px',

  },
  typoclass:{
    marginTop:'10px',
    marginLeft:'30px',
    flexGrow:1
  },

  menuItem:{
    // marginRight:1,
    width:'180px',
  },
  brandItem:{
    flexGrow:5,
  },
  sortMenu:{
    flexGrow: 2,
    
  },
 
  checkBox:{
    // marginTop:'-3px'
    width:10,
    height:10,
  },
  expandless:{
    width:'10px',
    height:'8px',
  },
  submenu :{
    width:'80%',
    height:'30%',
    margin:'auto'
  },
  buttonstyle:{
    textAlign:'left'
  }
}));

const categories = [
  'Bohomoon Ltd',
  'Ciate Ciate',
  'Kates Clothing Ltd',
  'Pink Boutique Ltd',
  'Univeral Works',
  'Maiyo Limited',
  'Indoi Ltd',
  'Fatlip Limitede',
  'Bohomoon Ltd',
  'Ciate Ciate',
  'Kates Clothing Ltd',
  'Pink Boutique Ltd',
  'Univeral Works',
  'Maiyo Limited',
  'Indoi Ltd',
  'Fatlip Limitede'
];

const sortby = ['Relevance','Price(row to high)','Price(row to high)']
const sizes = ['small','middle','big','extra-big']
const brands  = ['ARMANI','FENDI','HOUSE OF VERSACE','BURBERRY','RALPH LAUREN','CHANEL','PRADA','HERMES','GUCCI','LOUIS VUITTON']



export default function MenuBar() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState("");

  const [state, setState] = React.useState({
    categoryFlag: false,
    sizeFlag: false,
    brandFlag: false,
    sortByFlag: false,
    submenuCheked:false,
    totalFlag:false,
    key:0,
    directionImg:ExpandLess,
    directionImgC:ExpandLess,
    directionImgS:ExpandLess,
    directionImgB:ExpandLess,
    directionImgSo:ExpandLess,
    
  });

  const handleClick = e=>
  {
    // setAnchorEl(e.currentTarget);
    // setState({categoryFlag:true})
  }


  const toggleDrawer = (selectedcheckbox, open) => e => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }

    if(open){
      setState({ ...state,[selectedcheckbox]: open,directionImg: ExpandMore});
    } else{
      setState({ ...state,[selectedcheckbox]: open,directionImg: ExpandLess});
    }
    
  };

  const toggleMobileDrawer = (selectedcheckbox, open) => e => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }

    if(open){
      setState({ ...state,[selectedcheckbox]: open});
    } else{
      setState({ ...state,[selectedcheckbox]: open});
    }
    if(selectedcheckbox = 'categoryFlag'){
      setState({ ...state,[selectedcheckbox]: open,directionImgC: ExpandMore});
    } else{
      setState({ ...state,[selectedcheckbox]: open,directionImgC: ExpandLess});
    }

    if(selectedcheckbox = 'sizeFlag'){
      setState({ ...state,[selectedcheckbox]: open,directionImgS: ExpandMore});
    } else{
      setState({ ...state,[selectedcheckbox]: open,directionImgS: ExpandLess});
    }

    if(selectedcheckbox = 'brandFlag'){
      setState({ ...state,[selectedcheckbox]: open,directionImgB: ExpandMore});
    } else{
      setState({ ...state,[selectedcheckbox]: open,directionImgB: ExpandLess});
    }

    if(selectedcheckbox = 'sortByFlag'){
      setState({ ...state,[selectedcheckbox]: open,directionImgSo: ExpandMore});
    } else{
      setState({ ...state,[selectedcheckbox]: open,directionImgSo: ExpandLess});
    }


    
    
  };

  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickAway = () => {
    toggleDrawer('totalFlag', false);
  };

  // const classes = useStyles();
  return (
   
        <ThemeProvider>
                <div className = "MenuArea">
                <Hidden mdDown>

                      <div className = {classes.menubar}>
                      <ClickAwayListener onClickAway={toggleDrawer('totalFlag', false)}>
                      <Grid container xs = {12}>
                        <Grid item xs = {12} md = {2}>
                            <Typography variant = "h6" className = {classes.typoclass} component = "h2">
                              Refine your search  
                            </Typography>
                            <Collapse in = {state.totalFlag}>
                              <IconButton aria-label="delete" style = {{float:'left'}} onClick = {toggleDrawer('totalFlag', false)}>
                                        <Clear/>
                              </IconButton>
                            </Collapse>
                          
                        </Grid>
                        
                        <Grid item xs = {12} md = {2} >
                            <div>
                                <Checkbox
                                    color="default"
                                    className = {classes.checkBox}
                                    value="uncontrolled"
                                    size = "small"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                  />  
                                <ThemeProvider theme={innertheme}>
                                      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={toggleDrawer('totalFlag',true)}>
                                        CATEGORY
                                      </Button>
                                  </ThemeProvider>
                                  
                                  {/* <Typography component = "button" variant = "button" align = "left">CATEGORY</Typography>  */}
                                  <IconButton onClick = {toggleDrawer('totalFlag',false)}>
                                      <img src = {state.directionImg} className = {classes.expandless}/>
                                  </IconButton>
                            </div>
                            <div>
                                <Collapse in = {state.totalFlag} timeout = {1000}>
                                    <GridList cellHeight={30} spacing={1} cols = {1} style = {{height:300}}>
                                    {categories.map(category => ( 
                                      
                                        <FormControlLabel control={<Checkbox name="checkedC" size = "small" />} label={category} style = {{marginLeft:10}} />
                                      
                                    ))}
                                    </GridList>
                                </Collapse>
                            </div>
                        </Grid>

                        <Grid item xs = {12} md = {2} >
                          <div>
                          <Checkbox
                              color="default"
                              className = {classes.checkBox}
                              value="uncontrolled"
                              size = "small"
                              inputProps={{ 'aria-label': 'checkbox with default color' }}
                            />  
                              <ThemeProvider theme={innertheme}>
                                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={toggleDrawer('totalFlag',true)}>
                                    <span>size   </span>    
                                    </Button>
                                </ThemeProvider>
                                <IconButton onClick = {toggleDrawer('totalFlag',false)}>
                                    <img src = {state.directionImg} className = {classes.expandless}/>
                                </IconButton>
                          </div>

                        
                          <div>
                              <Collapse in = {state.totalFlag} timeout = {1000}>
                                  <GridList cellHeight={30} spacing={1} cols = {1} style = {{height:140}}>
                                  {sizes.map(size => ( 
                                      <FormControlLabel control={<Checkbox name="checkedC" size = "small" />} label={size} style = {{marginLeft:10}} />
                                    ))}
                                  </GridList>
                              </Collapse>
                            </div>

                        </Grid>

                        <Grid item xs = {12} md = {4}>
                            <div>
                                <Checkbox
                                  className = {classes.checkBox}
                                  color="default"
                                  value="uncontrolled"
                                  size = "small"
                                  inputProps={{ 'aria-label': 'checkbox with default color' }}
                                /> 
                                <ThemeProvider theme={innertheme}>
                                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={toggleDrawer('totalFlag', true)}>
                                BRAND
                                </Button>
                                </ThemeProvider> 
                              
                                  {/* {anchorEl ? <img src = {ExpandLess} /> : <img src = {ExpandMore} />}   */}

                                  <IconButton onClick = {toggleDrawer('totalFlag',false)}>
                                      <img src = {state.directionImg} className = {classes.expandless}/>
                                  </IconButton>
                            </div>
                              <div>
                              
                                <Collapse in = {state.totalFlag} timeout = {1000}>
                                      
                                    <GridList cellHeight={30} spacing={1} cols = {1} style = {{height:290}}>
                                    {brands.map(brand => ( 
                                      
                                        <FormControlLabel control={<Checkbox name="checkedC" size = "small" />} label={brand} style = {{marginLeft:10}} />
                                        
                                      ))}
                                    </GridList>
                                </Collapse>
                              
                              </div>

                        </Grid>
                        <Grid item md = {10} md = {2}>
                              <div>
                                  <Checkbox
                                    className = {classes.checkBox}
                                    color="default"
                                    value="uncontrolled"
                                    size = "small"
                                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                                    />  
                                  <ThemeProvider theme={innertheme}>
                                  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={toggleDrawer('totalFlag',true)}>
                                  Sort By
                                  </Button>
                                  </ThemeProvider> 
                                  <IconButton onClick = {toggleDrawer('totalFlag',false)}>
                                      <img src = {state.directionImg} className = {classes.expandless}/>
                                  </IconButton>
                              </div>

                              <div>
                              
                                <Collapse in = {state.totalFlag} timeout = {1000}>
                                      
                                    <GridList cellHeight={30} spacing={1} cols = {1} style = {{height:101}}>
                                    {sortby.map(sort => ( 
                                      
                                        <FormControlLabel control={<Checkbox name="checkedC" size = "small" />} label={sort} style = {{marginLeft:10}} />
                                        
                                      ))}
                                    </GridList>
                                </Collapse>
                              
                              </div>
                                      
                              
                        </Grid>
                      </Grid>
                      </ClickAwayListener>
                      </div>


                </Hidden>
                <Hidden smUp>

              <div className = {classes.menubar}>

                  <Grid container xs = {12}>
                    <Grid item xs = {12} md = {2}>
                        <Typography variant = "h6" className = {classes.typoclass} component = "h2">
                          Refine your search  
                        </Typography>
                        <Collapse in = {state.totalFlag}>
                          <IconButton aria-label="delete" style = {{float:'left'}} onClick = {toggleDrawer('totalFlag', false)}>
                                    <Clear/>
                          </IconButton>
                        </Collapse>
                      
                    </Grid>
                    
                    <Grid item xs = {12} md = {2} >
                        <div>
                            <Checkbox
                                color="default"
                                className = {classes.checkBox}
                                value="uncontrolled"
                                size = "small"
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                              />  
                            <ThemeProvider theme={innertheme}>
                                  <Button aria-controls="simple-menu" aria-haspopup="true" onClick ={toggleDrawer('categoryFlag', !state.categoryFlag)}>
                                    CATEGORY
                                  </Button>
                              </ThemeProvider>
                              
                              {/* <Typography component = "button" variant = "button" align = "left">CATEGORY</Typography>  */}
                              <IconButton onClick = {toggleDrawer('totalFlag',false)}>
                                  <img src = {state.directionImgC} className = {classes.expandless}/>
                              </IconButton>
                        </div>
                        <div>
                            <Collapse in = {state.categoryFlag} timeout = {1000}>
                                <GridList cellHeight={30} spacing={1} cols = {1} style = {{height:300}}>
                                {categories.map(category => ( 
                                  
                                    <FormControlLabel control={<Checkbox name="checkedC" size = "small" />} label={category} style = {{marginLeft:10}} />
                                  
                                ))}
                                </GridList>
                            </Collapse>
                        </div>
                    </Grid>

                    <Grid item xs = {12} md = {2} >
                      <div>
                      <Checkbox
                          color="default"
                          className = {classes.checkBox}
                          value="uncontrolled"
                          size = "small"
                          inputProps={{ 'aria-label': 'checkbox with default color' }}
                        />  
                          <ThemeProvider theme={innertheme}>
                                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={toggleDrawer('sizeFlag',!state.sizeFlag)}>
                                <span>size   </span>    
                                </Button>
                            </ThemeProvider>
                            <IconButton onClick = {toggleDrawer('totalFlag',false)}>
                                <img src = {state.directionImgS} className = {classes.expandless}/>
                            </IconButton>
                      </div>
          
                      <div>
                          <Collapse in = {state.sizeFlag} timeout = {1000}>
                              <GridList cellHeight={30} spacing={1} cols = {1} style = {{height:140}}>
                              {sizes.map(size => ( 
                                  <FormControlLabel control={<Checkbox name="checkedC" size = "small" />} label={size} style = {{marginLeft:10}} />
                                ))}
                              </GridList>
                          </Collapse>
                        </div>

                    </Grid>

                    <Grid item xs = {12} md = {4}>
                        <div>
                            <Checkbox
                              className = {classes.checkBox}
                              color="default"
                              value="uncontrolled"
                              size = "small"
                              inputProps={{ 'aria-label': 'checkbox with default color' }}
                            /> 
                            <ThemeProvider theme={innertheme}>
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={toggleDrawer('brandFlag', !state.brandFlag)}>
                            BRAND
                            </Button>
                            </ThemeProvider> 
                          
                              {/* {anchorEl ? <img src = {ExpandLess} /> : <img src = {ExpandMore} />}   */}
                              <IconButton onClick = {toggleDrawer('totalFlag',false)}>
                                  <img src = {state.directionImgB} className = {classes.expandless}/>
                              </IconButton>
                        </div>
                          <div>
                          
                            <Collapse in = {state.brandFlag} timeout = {1000}>
                                  
                                <GridList cellHeight={30} spacing={1} cols = {1} style = {{height:290}}>
                                {brands.map(brand => ( 
                                  
                                    <FormControlLabel control={<Checkbox name="checkedC" size = "small" />} label={brand} style = {{marginLeft:10}} />
                                    
                                  ))}
                                </GridList>
                            </Collapse>
                          
                          </div>

                    </Grid>
                    <Grid item md = {10} md = {2}>
                          <div>
                              <Checkbox
                                className = {classes.checkBox}
                                color="default"
                                value="uncontrolled"
                                size = "small"
                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                                />  
                              <ThemeProvider theme={innertheme}>
                              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={toggleDrawer('sortByFlag',!state.sortByFlag)}>
                              Sort By
                              </Button>
                              </ThemeProvider> 
                              <IconButton onClick = {toggleDrawer('totalFlag',false)}>
                                  <img src = {state.directionImgSo} className = {classes.expandless}/>
                              </IconButton>
                          </div>

                          <div>
                          
                            <Collapse in = {state.sortByFlag} timeout = {1000}>
                                  
                                <GridList cellHeight={30} spacing={1} cols = {1} style = {{height:101}}>
                                {sortby.map(sort => ( 
                                  
                                    <FormControlLabel control={<Checkbox name="checkedC" size = "small" />} label={sort} style = {{marginLeft:10}} />
                                    
                                  ))}
                                </GridList>
                            </Collapse>
                          
                          </div>
                          
                          
                    </Grid>
                  </Grid>
                  </div>               


              </Hidden>
              </div>
              </ThemeProvider>
    


    
  );
}

