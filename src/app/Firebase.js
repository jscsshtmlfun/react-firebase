import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import config from './firebase/config';
import Loading from '../common/Loading';
import SignIn from './firebase/SignIn';
import Home from './firebase/Home';

const core = firebase.initializeApp(config);

class Firebase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: 0};
  }

  componentDidMount() {
    core.auth().onAuthStateChanged(user => {
      this.setState({user: user});
    });
  }

  render() {
    const user = this.state.user;
    if (user) return <Home firebase={core}/>;
    if (user === 0) return <Loading/>;
    return <SignIn firebase={core}/>;
  }
}

export default Firebase;
