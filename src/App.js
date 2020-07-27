import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import {
  Home as HomeView,
  SignIn as SignInView,
  SignUp as SignUpView,
  Watched as WatchedView
} from './app/views';

import NavBar from './app/layouts/Menu';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    tonalOffset: 0.2,
  },
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div className="App-bar">
          <NavBar />
        </div>
        <div className="App-intro">
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route exact path="/watched" component={WatchedView} />
            <Route exact path="/sign-in" component={SignInView} />
            <Route exact path="/sign-up" component={SignUpView} />
            <Redirect to="/" />
          </Switch>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
