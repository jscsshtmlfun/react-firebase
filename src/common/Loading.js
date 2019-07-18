import React from 'react';
import './Loading.css';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dot: 1,
    };
  }

  animate() {
    const count = this.state.dot;
    const dots = count<3?count+1:1;
    this.setState({dot: dots});
  }

  componentDidMount() {
    this.intervalDots = setInterval(() => this.animate(), 300);
  }

  componentWillUnmount() {
    clearInterval(this.intervalDots);
  }

  render() {
    return (
      <div className="Loading">
        <h3>
          Loading
          <span className="Loading-dots">
            {'.'.repeat(this.state.dot)}
          </span>
        </h3>
      </div>
    );
  }
}

export default Loading;
