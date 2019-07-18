import React from 'react';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameClick = this.handleNameClick.bind(this);
  }

  handleNameClick(e) {
    e.preventDefault();
  }

  render() {
    return (
      <header className="Header text-right">
        <a href="#/" onClick={this.props.changePageUser}>
          <img
            src={this.props.photo}
            className="Header-photo"
            alt="user"
          />
          {this.props.name}
        </a>
        &nbsp;
        <button onClick={this.props.changePageHome}>Home</button>
        <button onClick={this.props.handleSignOut}>Sign Out</button>
      </header>
    );
  }
}

export default Header;
