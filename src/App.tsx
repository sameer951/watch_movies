import React, { Fragment } from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Error404 from './Pages/errorpage/error';
import { HomePage } from './Pages/homepage/home';
import { MovieDetails } from './Pages/moviedetails/moviedetail';
import { Header } from './components/header.component';
import { FavoritePage } from './Pages/favpage/fav';

export const URL_API_KEY = process.env.API_KEY || '877b40e6a574fa3be2baee32ff3390a4';
export const BASE_URL = "https://api.themoviedb.org/3";
const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});
const PageRoutings = () => {
  return (<Fragment>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/movie/:id" component={MovieDetails} />
      <Route exact path="/fav" component={FavoritePage} />
      <Route component={Error404} />
    </Switch>
  </Fragment>)
}

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Router>
        <Header></Header>
        <div style={{
          marginTop: '10vh',
          paddingInline: '10vw',
        }}>
          <PageRoutings></PageRoutings>
          <ToastContainer />
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

export default App;
