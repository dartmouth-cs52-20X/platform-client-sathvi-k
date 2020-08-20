import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { signinUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onEmailInput = this.onEmailInput.bind(this);
    this.onPasswordInput = this.onPasswordInput.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  onEmailInput = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordInput = (event) => {
    this.setState({ password: event.target.value });
  }

  onSignIn = () => {
    const userDetails = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signinUser(userDetails, this.props.history);
  }

  render() {
    return (
      <div className="create-container">
        <div className="create">
          <div className="input">
            <div>Sign In</div>
            <Input placeholder="Email" onChange={this.onEmailInput} value={this.state.email} />
            <Input placeholder="Password" onChange={this.onPasswordInput} value={this.state.password} />
          </div>
          <button onClick={this.onSignIn} type="button"> <i className="fas fa-check" /> </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { signinUser })(SignIn);
