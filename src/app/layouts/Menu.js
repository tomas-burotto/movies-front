import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { amber } from '@material-ui/core/colors';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import disconnect from '../utils/fetch/disconnect';
import { logOut } from '../redux/actions/authActions';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = props => {
  let history = useHistory();
  const classes = useStyles();
  const auth = useSelector(state => state.auth)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHome = () => {
    history.push("/")
  };

  const handleWatched = () => {
    history.push("/watched")
  };

  const handleWatchList = () => {
    history.push("/watch_list")
  };


  const handleLogout = async () => {
    setAnchorEl(null);
    await disconnect(auth.currentToken);
    dispatch(logOut());
  };

  const handleLogin = () => {
    if (auth.loggingIn) {
      history.push('/sign-out')
    }
    else {
      history.push('/sign-in')
    }
  }
  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>

            <Typography variant="h6" className={classes.title}>
            <Button color="inherit" onClick={handleHome} > Buscar </Button>
            <Button color="inherit" onClick={handleWatched} > Vistos </Button>
            <Button color="inherit" onClick={handleWatchList} > Watch List </Button>
            </Typography>
            {auth.loggingIn && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>{auth.currentEmail.split("@")[0]}</MenuItem>
                  <MenuItem onClick={handleLogout}> cerrar sesión </MenuItem>
                </Menu>
              </div>
            )}{!auth.loggingIn && (
              <Button color="inherit" onClick={handleLogin} > Iniciar Sesión </Button>
            )}
          </Toolbar>
        </AppBar>
        <br/>
      </div>
  );
}

export default NavBar;