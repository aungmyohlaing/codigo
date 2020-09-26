import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "white",
        },
        html: {
          scrollBehavior: "smooth",
        },
      },
    },
  },
  palette: {    
    primary: {
      main: "#d5333e",
      light: "#ff6969",
      dark: "#9c0018",
      textPrimary: "#ffffff",
    },
    secondary: {
      main: '#3a2837',
      light: '#655161',
      dark: '#150011',
      textSecondary: '#ffffff',
    },
  },
});

ReactDOM.render(  
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
