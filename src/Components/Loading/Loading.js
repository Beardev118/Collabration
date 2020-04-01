import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    '& > * + *': {
      
    //   marginTop: theme.spacing(10),
    },
  },
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
     <Container maxWidth = 'lg'>
        <LinearProgress color = "secondary" />
     </Container>
     
    </div>
  );
}