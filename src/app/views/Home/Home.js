import React, {useState} from 'react';
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
import ResultCard from './ResultCard';
import authentication from '../../utils/fetch/auth';
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


const Home = () => {
  const classes = useStyles();
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const auth = useSelector(state => state.auth)

  const handleSubmit = async (e) => {
    setLoading(true)
    const response = await getTitle(search)
    console.log(response.data)
    if (response.data.Title){
      setResult(response.data)
      setLoading(false)
    } else{
      setResult({"error": "not found"})
      setLoading(false)
    }

  }
  return (
    <center>
    <div className={classes.root}>
    {auth.loggingIn && (
      <Paper  className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Buscar pelicula o serie"
          inputProps={{ 'aria-label': 'search google maps' }}
          value = {search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton type="submit" className={classes.iconButton} onClick={handleSubmit}>
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton color="primary" className={classes.iconButton} aria-label="directions">
          <TheatersIcon />
        </IconButton>
      </Paper>
      )}
      {!auth.loggingIn &&(
        <h1>Debes iniciar sesion!</h1>
      )}
      </div>
      <br/>
      <div>
        {result &&(
        <ResultCard data={result} />
        )}
    </div>
    </center>
  );
}

export default Home;