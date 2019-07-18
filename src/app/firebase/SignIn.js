import React from 'react';
import Loading from '../../common/Loading';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  catchError(error) {
    alert(error.message);
    console.log(error);
    this.setState({loading: false});
  }

  firebaseAction(e, type) {
    e.preventDefault();
    if (this.state.loading) return;
    const core = this.props.firebase;
    const email = this.state.email;
    const password = this.state.password;
    let action;
    switch (type) {
      default:
        action = core.auth().signInWithEmailAndPassword(email, password);
    }
    action.catch(error => {this.catchError(error)});
    this.setState({loading: true});
  }

  handleSubmit(e) {
    this.firebaseAction(e);
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
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.email}
          onChange={this.handleEmailChange}
          type="email"
          placeholder="email"
          autoFocus
          required
        />
        <input
          value={this.state.password}
          onChange={this.handlePasswordChange}
          type="password"
          placeholder="password"
          required
        />
        <button onClick={this.handleSignIn}>Sign In</button>
        <button onClick={this.handleSignUp}>Sign Up</button>
        <button onClick={this.handleResetPassword}>Reset Password</button>
      </form>
    );
  }
}

export default SignIn;
