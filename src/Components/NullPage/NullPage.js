import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography'
import SearchBox from '../../Components/SearchBar/SearchBar'
import {useHistory} from 'react-router-dom'

export default function FormDialog({status}) {
  const [open, setOpen] = React.useState(status);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let url = new URL(window.location.href);
  let searchQuery = new URLSearchParams(url.search.slice(1));
  let searchTerm = searchQuery.get('search_q');


  return (
    <div>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">SEARCH</DialogTitle>
        <DialogContent>
          <DialogContentText>

               <Typography variant = 'p' color = 'primary'>Your search for "{searchTerm}"  did not return any results.</Typography>
               <Typography variant = 'p' color = 'primary'></Typography>
               
               <Typography variant = 'h4' color = 'primary' style = {{marginTop:'10px'}}>Search Tips</Typography>
               <ul>
                 <li>Try searching by product type, brand or description </li>
                 <li>Check your spelling</li>
                 <li>Broaden your search by using fewer or more general words</li>
               </ul>
            
          </DialogContentText>
         
        </DialogContent>
        
        <div style = {{marginBottom:"30px",paddingLeft:'10px',paddingRight:'10px'}} >
        <SearchBox Close = {handleClose}/>
        </div>
      
      </Dialog>
    </div>
  );
}
