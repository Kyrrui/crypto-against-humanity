import web3 from './web3'
import React, { Component } from 'react';
import { Button } from 'react-bootstrap'
import logo from './logo.svg';
import './App.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Rules from "./Rules";
import HallOfShame from "./HallOfShame";
import CreateCard from "./CreateCard";
import LandingPage from "./LandingPage";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      hasMetamask: false
    }
    this.checkWeb3();
  }

  checkWeb3 = async () => {
    if(web3 != "undefined") {
      const address = await web3.eth.getAccounts();
      this.setState({isLoggedIn: false, hasMetamask: true})
      if (address.length > 0) {
        this.setState({isLoggedIn: true, hasMetamask: true})
      }
    }
  }

  render() {
    const styleCreateCard = {
      width: '107px',
      height: '40px',

      borderRadius: '4px',
      backgroundColor: '#d94a4d',
      // boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.2)',

      fontFamily: 'Arial',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white',
    }
    return (
    <HashRouter>
    <div><b>{this.state.isLoggedIn == true ?
      <div className="appContainer">
        <div className="topnav">
          <a href="#home"><div className="header-brand nav-left">Crypto Against Humanity</div></a>

          <div className="nav-right">
            <a href="#home" ><NavLink to="/home">Play</NavLink></a>
            <a href="#rules"><NavLink to="/rules">Guide</NavLink></a>
            <a href="#hall-of-shame"><NavLink to="/hall-of-shame">Hall of Shame</NavLink></a>
            <a href="#create-card"><NavLink to="/create-card" style={styleCreateCard}>Create Card</NavLink></a>
          </div>
        </div>
        <div className="content">
            <Route exact path="/" component={Home}/>
            <Route exact path="/home" component={Home}/>
            <Route path="/rules" component={Rules}/>
            <Route path="/hall-of-shame" component={HallOfShame}/>
            <Route path="/create-card" component={CreateCard}/>
        </div>
      </div>  
      : 
      <div>
          <LandingPage hasMetamask={this.state.hasMetamask}/>
      </div>} 
    </b></div>
    </HashRouter>
    );
  }
}

export default App;
