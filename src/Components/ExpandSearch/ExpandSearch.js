
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from '../SearchBar/SearchBar';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton:{
    padding:'0px'
  },
 
}));

export default function ExpandSearch() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick = {handleOpen} className = {classes.iconButton}>
        <SearchIcon/>
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
      <Fade in={open}>
       <Grid container xs = {12} justify = 'center'>
         <Grid item xs = {5}>
         <SearchBar className = "SearchBar" Close = {handleClose}/>
         </Grid>
       </Grid>
        </Fade>
      </Modal>
    </div>
  );
}
