import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Header from '../Components/Header/Header';
import MetaTags from 'react-meta-tags';





const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const classes = useStyles();

  return (
    <React.Fragment style = {{overflowY:"scroll"}}>
      <MetaTags>
            <title>ModaCompris Comparison Shopping Site by We are Polymer</title>
            <meta name="description" content="ModaCompris is a comparison shopping site (CSS) run by London based online performance agency We are Polymer." />
            <meta property="og:title" content="ModaCompris Comparison Shopping Site by We are Polymer" />
          </MetaTags>
      <Header/>
      <main>
{/* Hero unit */}
        <Container maxWidth="sm">
          <Grid container xs = {12}>
            <Grid item>

            <Box mt = {8} mb = {4}>
            <Typography component="h2" align="center" color="textPrimary" gutterBottom>
                <span variant = "h2">We are polymer.</span><span variant = "h3">SHOP</span>
                </Typography>
                <Typography variant="subtitle2" align="center" color="textSecondary" paragraph>
                  Something short and leading about the collection below—its contents, the creator, etc.
                  Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                  entirely.
                </Typography>
            </Box>

              
            </Grid>
          </Grid>
          
        </Container>

    </main>

<Container className={classes.cardGrid} maxWidth="md">
  {/* End hero unit */}
  <Grid container spacing={4}>
    {cards.map(card => (
      <Grid item key={card} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
            Lorem Ipsum is simply dummy text 
            </Typography>
            <Typography>
            xt ever since the 1500s, when an unknown printer took a galley of 
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Readmore
            </Button>

          </CardActions>
        </Card>
      </Grid>
    ))}
  </Grid>
</Container>
    </React.Fragment>
  );
}