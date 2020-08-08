import React from 'react';
import '../style.scss';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../img/waveform.gif';

const Nav = (props) => {
  return (
    <div className="header">
      <div className="sitename">
        <img id="logo" src={logo} alt="waves" /> {/* importing gif in react page: https://stackoverflow.com/questions/44371716/add-animated-gifs-to-react-web-apps */}
        MusicDiscovery
      </div>
      <nav className="header-nav">
        <ul>
          <li><NavLink exact to="/">All Recs</NavLink></li>
          <li><NavLink to="/posts/new">Share your favorite album!</NavLink></li>
        </ul>
      </nav>
    </div>

  );
};

export default withRouter(connect(null, null)(Nav));
