import React from 'react';
import './SignIn.css';
import Component from '../../wrapper/Component';
import Loading from '../../common/Loading';
import ViewSource from '../../common/ViewSource';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'dummy@us.er',
      password: 'fR58fT}F@)Mc*E"S',
      loading: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  catchError(error) {
    alert(error.message);
    console.log(error);
    this.delayedSetState({loading: false});
  }

  firebaseAction(e, type) {
    e.preventDefault();
    if (this.state.loading) return;
    const auth = this.props.firebase.auth();
    const email = this.state.email;
    const password = this.state.password;
    let action;
    switch (type) {
      case 'password-reset':
        action = auth.sendPasswordResetEmail(email).then(() => {
          alert('Password reset email sent!');
          this.delayedSetState({loading: false});
        });
        break;
      case 'sign-up':
        action = auth.createUserWithEmailAndPassword(email, password);
        break;
      default:
        action = auth.signInWithEmailAndPassword(email, password);
    }
    action.catch(error => {this.catchError(error)});
    this.setState({loading: true});
  }

  handleResetPassword(e) {
    this.firebaseAction(e, 'password-reset');
  }

  handleSubmit(e) {
    this.firebaseAction(e);
  }

  handleSignUp(e) {
    this.firebaseAction(e, 'sign-up');
  }

  handleSignIn(e) {
    if (this.state.email && this.state.password) this.handleSubmit(e);
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  render() {
    if (this.state.loading) return <Loading/>;
    return (
      <div className="SignIn text-center">
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.email}
            onChange={this.handleEmailChange}
            type="email"
            placeholder="email"
            autoFocus
            required
          />
          <br/>
          <input
            value={this.state.password}
            onChange={this.handlePasswordChange}
            type="password"
            placeholder="password"
            required
          />
          <br/>
          <br/>
          <button onClick={this.handleSignIn}>Sign In</button>
          <br/>
          <br/>
          <button onClick={this.handleSignUp}>Sign Up</button>
          &nbsp;
          <button onClick={this.handleResetPassword}>Reset Password</button>
          <br/>
          <br/>
          <br/>
          <ViewSource/>
        </form>
      </div>
    );
  }
}

export default SignIn;
