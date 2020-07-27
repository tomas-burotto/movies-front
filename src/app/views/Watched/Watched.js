import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TheatersIcon from '@material-ui/icons/Theaters';
import getTitle from '../../utils/omdb/title';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import findWatcheds from '../../utils/querys/watched';
import { useSelector, useDispatch } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));


const Watched = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState([])
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    // Actualiza el título del documento usando la API del navegador
    async function fetchData() {
      // You can await here
       const result = await findWatcheds(auth.currentToken)
       setMovies(result.data)
      // ...
    }
    fetchData();
    
  }, []);


  return (
    <div>
      {auth.loggingIn &&(
      <Grid container spacing={3}>
        {movies.map((movie, i) =>{
          return(<Grid item xs={6} sm={3}>
            <Card className={classes.root}>
        <CardHeader

          action={
            <IconButton aria-label="settings">
            </IconButton>
          }
          title={movie.name}
          subheader={"Rate: " + movie.score + "/5"}
        />
        <CardMedia
          className={classes.media}
          image={movie.image}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {movie.description}
          </Typography>
          <br/>
          <Divider></Divider>
          <Typography variant="body2" color="textSecondary" component="p">
            {movie.comment}
          </Typography>
        </CardContent>
      </Card>
          </Grid>)
        })}
      </Grid>
      )}
      {!auth.loggingIn &&(
        <h1> Debes iniciar sesion </h1>
      )}
    </div>
  );
  }

export default Watched;