import React, { Component } from 'react';
import './App.css';
import fire from './config/fire';
import Login from './components/Login.js';
import Home from './components/Home';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userEmail: "",
    };

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user,
          userEmail: user.email
        });
      } else {
        this.setState({ user: null, userEmail: "" });
      }
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.user ? (<Home emailId={this.state.userEmail} />) : (<Login />)}
      </div>
    );
  }
}

export default App;
