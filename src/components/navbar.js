import React, { Component } from 'react';
import '../style.scss';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../img/waveform.gif';
import { signoutUser } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.onClickSignOut = this.onClickSignOut.bind(this);
  }

  onClickSignOut = () => {
    console.log('signing out');
    this.props.signoutUser(this.props.history);
  }

  render() {
    if (this.props.authenticated) {
      return (
        <div className="header">
          <div className="sitename">
            <img id="logo" src={logo} alt="waves" /> {/* importing gif in react page: https://stackoverflow.com/questions/44371716/add-animated-gifs-to-react-web-apps */}
            MusicDiscovery
          </div>
          <nav className="header-nav">
            <ul>
              <li><NavLink exact to="/"><i className="fas fa-th" /> &nbsp;All Recs</NavLink></li>
              <li><NavLink to="/posts/new"><i className="fas fa-plus" /> &nbsp;Share an album</NavLink></li>
              <li><button className="signout" onClick={this.onClickSignOut} type="button"><i className="fas fa-sign-out-alt" /> Sign Out </button></li>
            </ul>
          </nav>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div className="sitename">
            <img id="logo" src={logo} alt="waves" /> {/* importing gif in react page: https://stackoverflow.com/questions/44371716/add-animated-gifs-to-react-web-apps */}
            MusicDiscovery
          </div>
          <nav className="header-nav">
            <ul>
              <li><NavLink exact to="/"><i className="fas fa-th" /> &nbsp; All Recs</NavLink></li>
              <li><NavLink to="/posts/new"><i className="fas fa-plus" /> &nbsp; Share an album!</NavLink></li>
              <li><NavLink to="/signin"><i className="fas fa-sign-in-alt" /> &nbsp;Sign In</NavLink></li>
              <li><NavLink to="/signup"><i className="fas fa-user-plus" /> &nbsp;Sign Up</NavLink></li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}

function mapStateToProps(reduxState) {
  return {
    authenticated: reduxState.auth.authenticated,
  };
}

export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));
