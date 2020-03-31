import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import { Container, Grid } from '@material-ui/core';
import Header from '../Components/Header/Header';
import MetaTags from 'react-meta-tags';
import Footer from '../Components/Footer/Footer'



const styles = theme => ({
  root: {
    flexGrow:1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '66%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  title:{
    marginTop:'30px' ,
    marginBottom:'30px'
  }

});

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <React.Fragment>

          <MetaTags>
            <title>: FAQ | ModaCompris Comparison Shopping Site </title>
            <meta name="description" content="Description: Frequently asked questions for the ModaCompris comparison shopping site (CSS)." />
            <meta property="og:title" content=": FAQ | ModaCompris Comparison Shopping Site " />
          </MetaTags>

        <Header/>
        <div className={classes.root}>
          <Box my = {8}>
          <Typography variant="h4" color="textPrimary" align="center">
          Find the answer you need by clicking on the topics below.
          </Typography>
          </Box>
          <Container maxWidth = "md">
          <Box mt = {3}>
          <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Do you charge for adding my feed?</Typography>
            {/* <Typography className={classes.secondaryHeading}>I am here to help you</Typography> */}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            No. If you want us to distribute your feed to Google Shopping then there would be an extra cost, contact us to find out more.
            </Typography>
          </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Can I remove my feed?</Typography>
           
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            Yes, you can remove it at any time, just contact us.
            </Typography>
          </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Is this site indexed by Google?</Typography>
           
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            Yes, your products will be indexed by Google and any visitors to this site are able to click directly to your product page to buy it.
            </Typography>
          </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Do you provide other services?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            We are Polymer, the agency that runs this site offers a wide range of services including PPC, SEO and paid social, get in touch to find out more.
            </Typography>
          </ExpansionPanelDetails>
          </ExpansionPanel>
          </Box>
          <Footer/>

          </Container>

      </div>
      </React.Fragment>
      
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
