import React, {Component} from 'react';
import {connect} from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Chat from './components/chat';
import Login from './components/login';
import requireUser from './components/require_user';
import {connectToChatServer} from './actions/chat';

class App extends Component {

  componentDidMount(){
		this.props.connectToChatServer(`wss://43b43ac5-caf6-40ed-b620-6c294ba4a229.broker.netifi.io:8101/`);
  }

  render(){
    return(
      <Router>
        <div className="full-height">
          <Route exact path="/" component={Login}/>
          <Route exact path="/chat" component={requireUser(Chat)}/>
        </div>
      </Router>
    );
  }
}

export default connect(null, {connectToChatServer})(App);
