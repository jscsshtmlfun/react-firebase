import React from 'react';
import './Home.css';
import Header from './Header';
import User from './User';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.firebase.auth().currentUser;
    this.state = {
      name: user.displayName || user.email,
      page: null,
      loading: false,
    };

    this.handleSignOut = this.handleSignOut.bind(this);
    this.changePageUser = this.changePageUser.bind(this);
    this.changePageHome = this.changePageHome.bind(this);
    this.setNameState = this.setNameState.bind(this);
  }

  setNameState(name) {
    this.setState({name: name});
  }

  handleSignOut() {
    if (this.state.loading) return;
    this.props.firebase.auth().signOut();
    this.setState({loading: true});
  }

  changePageHome(e) {
    this.changePage(e);
  }

  changePageUser(e) {
    this.changePage(e, 'user');
  }

  changePage(e, page) {
    e.preventDefault();
    const user = this.props.firebase.auth().currentUser;
    this.setState({
      page: page,
      name: user.displayName || user.email,
    });
  }

  render() {
    let view;
    const header = <Header
      changePageHome={this.changePageHome}
      changePageUser={this.changePageUser}
      handleSignOut={this.handleSignOut}
      name={this.state.name}
      firebase={this.props.firebase}
    />;
    switch (this.state.page) {
      case 'user':
        view = <User
          firebase={this.props.firebase}
          setNameState={this.setNameState}
        />;
        break;
      default:
        view = (
          <h1>Home</h1>
        );
    }
    return (
      <div className="Home">
        {header}
        {view}
      </div>
    );
  }
}

export default Home;
