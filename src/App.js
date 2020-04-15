import  React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { makeStyles} from '@material-ui/core/styles';
import Home from './Pages/Home';
import Product from './Pages/Search/Product';
import About from './Pages/about';
import FAQ from './Pages/Faq';
import Retailers from './Pages/Retailer';
import AddFeed from './Pages/AddFeed/AddFeed';
import Contact from './Pages/Contactus'
import Privacy from './Pages/Privacy/Privacy'
import Main from './Pages/Admin/Dashboard'
import {SearchProvider} from './Components/SearchBar/SearchBarContext'
// import { Router, Link } from "@reach/router"

const useStyles = makeStyles(theme => ({
 
  pageContainer:{
    msOverflowX:'hidden',
    marginRight: 'calc(-1 * (100vw - 100%))',
  },

}));

export default function ProminentAppBar() {
  const classes = useStyles();

  return (
     <div className = {classes.pageContainer}>
       <SearchProvider>

        <Router>
            <Switch>
                  <Route exact path="/" component = {Home}/>
                  <Route exact path = "/faq" component = {FAQ}/>
                  <Route exact path="/about" component = {About}/>
                  <Route exact path="/retailers" component = {Retailers}/>
                  <Route exact path = '/add_feed' component = {AddFeed}/>
                  <Route exact path="/search" component = {Product}/>
                  <Route exact path="/privacy" component = {Privacy}/>
                  <Route exact path="/contact" component = {Contact}/>
                  <Route exact path="/main" component = {Main}/>
            </Switch> 
                  {/* <Home path="/" />
                  {/* {/* <FAQ path="/faq" />
                  <Product path="/register" />
                  <About path = "/about"/> */} 
        </Router>
       </SearchProvider>

     </div>
  );
}
