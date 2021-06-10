import React, { Component } from 'react'

import Firebase from '../firebase/firebase';
const auth = Firebase.instance().auth;

export default class Register extends Component {

  constructor(props) {
    super(props);

    if (this.props.user) {
      this.props.history.push('/');
    }

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

  async register(e) {
    e.preventDefault();

    try {
      const { email, password } = this.state;
      await auth.createUserWithEmailAndPassword(email, password);

      this.props.history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <form onSubmit={(e) => this.register(e)}>

        <h1 className="h3 mb-3 text-center">Please Register</h1>

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
            Register
            </button>
        </div>

      </form>
    )
  }
}
