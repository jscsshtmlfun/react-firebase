import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    if (this.state.loading) return;
    this.props.firebase.auth().signOut();
    this.setState({loading: true});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleSignOut}>Sign Out</button>
      </div>
    );
  }
}

export default Home;
