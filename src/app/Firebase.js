import React from 'react';
import Component from '../wrapper/Component';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import config from './firebase/config';
import Loading from '../common/Loading';
import SignIn from './firebase/SignIn';
import Home from './firebase/Home';

const core = firebase.initializeApp(config);

class Firebase extends Component {
  constructor(props) {
    super(props);
    this.createNew = false;
    this.state = {
      user: 0,
    };
  }

  componentDidMount() {
    const auth = core.auth();
    auth.onAuthStateChanged(user => {
      this.delayedSetState({user: user});
      if (!this.createNew && user === null) {
        this.createNew = true;
        auth.signInWithEmailAndPassword(
          'dummy@us.er', 'fR58fT}F@)Mc*E"S'
        ).catch(error => {
          alert(error.message);
          console.log(error);
        });
      }
    });
  }

  render() {
    const {user} = this.state;
    if (user === 0) return <Loading/>;
    if (user) return <Home firebase={core}/>;
    return <SignIn firebase={core}/>;
  }
}

export default Firebase;
