import React from 'react';

class Component extends React.Component {
  delayedSetState(obj) {
    setTimeout(() => {
      this.setState(obj)
    }, 3000);
  }
}

export default Component;
