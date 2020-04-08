import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';



// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#FFF',
      main: '#1a1919',
      light:'#474747',
      dark:'#000000',
      contrastText:'#FFFFFF'
    },

    accent:{
      main:'#1A1919'
    },
    
    secondary: {
      main: '#1a1919',
      light:'#474747',
      dark:'#000000',
      contrastText:'#FFFFFF'
    },
    error: {
      main: red.A400,
    },  
    background: {
      default: '#fff',
      paper:'#FFFFFF',
    },
   

    
  },

  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        // color: 'white',

      },
    },

    MuiInputLabel:{
      
    },

    MuiCheckbox:{
      disableRipple:"none",
      // color:"default",
      root: {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
      
      icon: {
        borderRadius: 3,
        width: 16,
        height: 16,
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


  typography: {
    fontFamily: [
      '"HelveticaNeueW01-65Medi"',
      '"sans-serif"',
    ].join(','),

    //Product title font
    subtitle1:{

      fontFamily: [
        
        '"poppins"',
        '"helvetica neue"',
        '"Arial"',
        '"sans-serif"',
      ].join(','),
      fontSize:'12px',
      fontWeight:600,
      fontStyle:'normal',
      textTransform: 'uppercase',
      letterSpacing: '0.75px',
    },
    h6:{
      fontFamily: [
        '"HelveticaNeue"',
      
      ].join(','),
      fontSize:'11px',
      letterSpacing: '0.75px',
      fontWeight:'normal',
      lineHeight:'0.833',
      fontStyle: 'normal',
     
    },
    h1:{
      fontFamily: [
        '"Libre Baskerville"',
      ].join(','),
      fontSize:'70px',
      letterSpacing: '1px',
      fontWeight:700,
      whiteSpace:'nowrap',
    },
    h2:{
      fontFamily: [
        '"Libre Baskerville"',
      
      ].join(','),
      fontSize:'70px',
      letterSpacing: '0.15px',
      fontWeight:700,
      whiteSpace:'nowrap',
    },
    h3:{
      fontFamily: [
        '"HelveticaNeue"',
        '"San Serif"'
      
      ].join(','),
      fontSize:'35px',
      letterSpacing: '1px',
      fontWeight:200,
      lineHeight:'1.8',
      fontStyle: 'normal',
      whiteSpace:'nowrap',
    },

    //Page title font : ex: contact us, FAQs

    h4:{
      fontFamily: [
        '"poppins"',
        '"helvetica neue"',
        '"Arial"',
        '"sans-serif"',
      ].join(','),
      fontSize:'14px',
      letterSpacing: '0.5px',
      fontWeight:500,
      fontStyle:'normal',
    },

    h5:{
      fontFamily: [
        '"HelveticaNeue"',
      
      ].join(','),
      fontSize:'12px',
      letterSpacing: '0.75px',
      fontWeight:'normal',
      lineHeight:'1.5',
      fontStyle: 'normal',
      
      
     
    },
    body1:{
      fontFamily: [
        '"poppins"',
        '"helvetica neue"',
        '"Arial"',
        '"sans-serif"',
      ].join(','),
      fontSize:'12px',
      letterSpacing: '0.5px',
      fontWeight:600,
      fontStyle:'normal',

    },
    body2:{
      fontFamily: [

        '"poppins"',
        '"helvetica neue"',
        '"Arial"',
        '"sans-serif"',
      ].join(','),
      fontSize:'12px',
      fontStyle:'normal',
      fontWeight:'normal',


    },
    button:{
      fontFamily: [

        '"Arial"',
      ].join(','),
      fontSize:'10px',
      fontStyle:'normal',
      fontWeight:'bold',
      letterSpacing: '0.1px',
    }

  },

});

export default theme;
