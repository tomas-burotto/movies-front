import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { useSelector, useDispatch } from 'react-redux';
import createDesired from '../../utils/querys/desireds';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import createWatched from '../../utils/querys/watcheds';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));


export default function ResultCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const data = props.data
  const auth = useSelector(state => state.auth)
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [rating, setRating] = React.useState(0);

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleWishList = async () => {
    const result = await createDesired(auth.currentToken, data)

  }

  const handleWatchedList = async () => {
    const response = await createWatched(auth.currentToken, data, rating, comment)
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false)
  }


  return (
    <div>
      <Card className={classes.root}>
        <CardHeader

          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={data.name}
          subheader={"IMDB Score: " + data.imdbRating + "/10"}
        />
        <CardMedia
          className={classes.media}
          image={data.image}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip title="Agregar a Wish List">
            <IconButton aria-label="add to favorites" onClick={handleWishList}>
              <AddIcon title="Agregar a vista" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Agregar como visto">
            <IconButton aria-label="share" onClick={handleOpen}>
              <RateReviewIcon />
            </IconButton>
          </Tooltip>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem >
                Director: 
              </ListItem>
              <Divider />
              <ListItem >
                Actores: 
              </ListItem>
              <ListItem >
                Año: 
              </ListItem>
              <ListItem >
                Generos: 
              </ListItem>
              <ListItem >
                Pais:
              </ListItem>
              <ListItem >
                Tipo: 
              </ListItem>
            </List>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}