import React from 'react';
import './User.css';
import defaultPhoto from './user.svg';
import Loading from '../../common/Loading';

class User extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.firebase.auth().currentUser;
    this.state = {
      name: user.displayName || user.email,
      photoURL: defaultPhoto,
      loading: false,
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleUpdateName = this.handleUpdateName.bind(this);
    this.photo();
  }

  photo(file) {
    const core = this.props.firebase;
    const user = core.auth().currentUser;
    const path = 'user_profile_photos/' + user.uid;
    const ref = core.storage().ref().child(path);
    if (file) {
      ref.put(file).then(snapshot => {
        this.photo();
      });
      return;
    }
    ref.getDownloadURL().then(url => {
      this.setState({photoURL: url});
    }).catch(error => {
      alert(error.message);
      console.log(error);
    });
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
        <input type="file" accept="image/*"/>
        <button>Upload</button>
        <br/>
        <img
          src={this.state.photoURL}
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
