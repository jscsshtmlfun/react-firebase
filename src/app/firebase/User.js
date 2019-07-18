import React from 'react';
import './User.css';
import Loading from '../../common/Loading';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      photo: this.props.photo,
      loading: false,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleUpdateName = this.handleUpdateName.bind(this);
  }

  handleUpdateName(e) {
    if (this.state.loading) return;
    this.props.firebase.auth().currentUser.updateProfile({
      displayName: this.state.name
    }).then(() => {
      this.setState({loading: false});
    }).catch(error => {
      alert(error.message);
      console.log(error);
    });
    this.setState({loading: true});
  }

  handleChangeName(e) {
    const name = e.target.value;
    this.props.setNameState(name);
    this.setState({name: name});
  }

  render() {
    if (this.state.loading) return <Loading/>;
    return (
      <div className="User text-center">
        <h1>{this.state.name}</h1>
        <input type="file" accept="image/*" ref={this.props.refInputPhoto}/>
        <button onClick={this.props.handleUploadPhoto}>Upload</button>
        <br/>
        <img
          src={this.state.photo}
          className="User-photo"
          alt="user"
        />
        <br/><br/>
        <input value={this.state.name} onChange={this.handleChangeName}/>
        <br/>
        <button onClick={this.handleUpdateName}>Change</button>
      </div>
    );
  }
}

export default User;
