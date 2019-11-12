import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
// Components
import NavBar from "./components/NavBar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffca28",
      contrastText: "#fff",
      light: '#ffd453',
      dark: '#b28d1c',
    },
    secondary: {
      main: "#fafafa",
      contrastText: "#fff",
      light: '#fbfbfb',
      dark: '#afafaf'
    }
  },
  typography: {
    useNextVariants: true
  }
});
function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <NavBar></NavBar>
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
