import React from 'react';
import './ViewSource.css';

class ViewSource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {button: "View Source"};
    this.handleViewSource = this.handleViewSource.bind(this);
  }

  handleViewSource(e) {
    if (this.state.button === "Hide Source") {
      const el = document.getElementsByClassName("ViewSource")[0];
      el.remove();
      this.setState({button: 'View Source'});
      return;
    }
    const button = e.target;
    const parent = button.parentElement;
    let code = document.createElement('textarea');
    let source = "<!DOCTYPE html><html>";
    code.className = "ViewSource";
    code.rows = 16;
    source += document.getElementsByTagName('html')[0].innerHTML;
    source += "</html>";
    source = source.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    code.innerHTML = source;
    parent.insertBefore(code, button);
    this.setState({button: 'Hide Source'});
  }

  render() {
    return <button onClick={this.handleViewSource}>{this.state.button}</button>;
  }
}

export default ViewSource;
