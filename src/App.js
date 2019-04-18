import React, { Component } from 'react';
import './App.css';

import axios from "axios";

import Signup from './components/user-pages/Signup';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: null,
    }
  }

  componentDidMount(){
    axios.get("http://localhost:3001/api/checkuser", { withCredentials:true })
    .then(responseFromBackend => {
      // console.log("Check User in APP.JS: ",responseFromBackend.data)
      const { userDoc } = responseFromBackend.data;
      this.syncCurrentUser(userDoc);
    });
  }

  syncCurrentUser(user){
    this.setState({ currentUser: user });
  }

  



  render() {
    return (
      <div className="App">
        <header>
         <h1> IronPhones ☎ </h1>
        </header>

        <Signup currentUser={this.state.currentUser} 
          onUserChange={ userDoc => this.syncCurrentUser(userDoc) }   />


        <footer>
          Made with ❤️ at Ironhack - PTWD 2019
        </footer>
      </div>
    );
  }
}

export default App;
