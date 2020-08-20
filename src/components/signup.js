import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      fullname: '',
    };
    this.onEmailInput = this.onEmailInput.bind(this);
    this.onPasswordInput = this.onPasswordInput.bind(this);
    this.onUsernameInput = this.onUsernameInput.bind(this);
    this.onFullnameInput = this.onFullnameInput.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  onEmailInput = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordInput = (event) => {
    this.setState({ password: event.target.value });
  }

  onUsernameInput = (event) => {
    this.setState({ username: event.target.value });
  }

  onFullnameInput = (event) => {
    this.setState({ fullname: event.target.value });
  }

  onSignUp = () => {
    const userDetails = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      fullname: this.state.fullname,
    };
    this.props.signupUser(userDetails, this.props.history);
  }

  render() {
    return (
      <div className="create-container">
        <div className="create">
          <div className="input">
            <div>Sign Up to start sharing music!</div>
            <Input placeholder="Email" onChange={this.onEmailInput} value={this.state.email} />
            <Input placeholder="Username" onChange={this.onUsernameInput} value={this.state.username} />
            <Input placeholder="Password" onChange={this.onPasswordInput} value={this.state.password} />
            <Input placeholder="Full name" onChange={this.onFullnameInput} value={this.state.fullname} />
          </div>
          <button onClick={this.onSignUp} type="button"> <i className="fas fa-check" /> </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { signupUser })(SignUp);
