import React, { Component } from 'react';
import { deepPurple500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import './Home.css';


class Home extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="My AppBar" />    
        </MuiThemeProvider>
        <div className="search-text-field">
          <MuiThemeProvider>
            <TextField
              hintText="Full width"
              fullWidth={true}
            />
          </MuiThemeProvider>
        </div>
        <div>
          hey there I'm home
        </div>
      </div>
    );
  }
}

export default Home;