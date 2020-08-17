import React from 'react';
import '../style.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './navbar';
import NewPost from './newpost';
import Post from './post';
import Posts from './posts';
import Fallback from './fallback';
import SignIn from './signin';
import SignUp from './signup';
import PrivateRoute from './privateRoute';

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <PrivateRoute path="/posts/new" component={NewPost} />
          <Route path="/posts/:postID" component={Post} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route component={Fallback} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
