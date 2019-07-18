import React from 'react';
import './Home.css';
import Header from './Header';
import User from './User';
import Loading from '../../common/Loading';
import defaultPhoto from './user.svg';

class Home extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.firebase.auth().currentUser;
    this.state = {
      name: user.displayName || user.email,
      photo: defaultPhoto,
      page: null,
      loading: false,
    };

    this.handleSignOut = this.handleSignOut.bind(this);
    this.changePageUser = this.changePageUser.bind(this);
    this.changePageHome = this.changePageHome.bind(this);
    this.setNameState = this.setNameState.bind(this);
    this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
    this.refInputPhoto = React.createRef();
    this.photo();
  }

  handleUploadPhoto(e) {
    const file = this.refInputPhoto.current.files[0];
    if (!file) {
      alert('Choose photo!');
      return;
    }
    this.photo(file);
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
      this.setState({loading: true});
      return;
    }
    ref.getDownloadURL().then(url => {
      this.setState({
        photo: url,
        loading: false,
      });
    }).catch(error => {
    });
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
    if (this.state.loading) return <Loading/>;
    let view;
    const header = <Header
      changePageHome={this.changePageHome}
      changePageUser={this.changePageUser}
      handleSignOut={this.handleSignOut}
      photo={this.state.photo}
      name={this.state.name}
      firebase={this.props.firebase}
    />;
    switch (this.state.page) {
      case 'user':
        view = <User
          name={this.state.name}
          photo={this.state.photo}
          firebase={this.props.firebase}
          setNameState={this.setNameState}
          handleUploadPhoto={this.handleUploadPhoto}
          refInputPhoto={this.refInputPhoto}
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
