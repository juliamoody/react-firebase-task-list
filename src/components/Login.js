import React, { Component } from 'react'

import firebase from '../firebase/firebase';

export default class Login extends Component {

  constructor(props) {
    super(props);

    if (this.props.user) {
      this.props.history.push('/');
    }

    this.auth = firebase.auth();
    this.state = {
      email: '',
      password: '',
    }
  }

  onEmailChanged(e) {
    this.setState({
      email: e.target.value
    });
  }

  onPasswordChanged(e) {
    this.setState({
      password: e.target.value
    });
  }

  async login(e) {
    e.preventDefault();

    try {
      const { email, password } = this.state;

      await this.auth
        .signInWithEmailAndPassword(email, password);

      this.props.history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <form onSubmit={(e) => this.login(e)}>

        <h1 className="h3 mb-3 text-center">Please Login</h1>

        <div>
          <label className="form-label">
            Email address
            </label>
          <input
            value={this.state.email}
            onChange={(e) => this.onEmailChanged(e)}
            type="email"
            className="form-control"
          />
        </div>

        <div className="mt-4">
          <label className="form-label">
            Password
            </label>
          <input
            value={this.state.password}
            onChange={(e) => this.onPasswordChanged(e)}
            type="password"
            className="form-control" />
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-primary px-5" type="submit">
            Login
            </button>
        </div>
      </form>
    )
  }
}
