import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="text-center">
        <div className="mb-3">
          <strong>Welcome to this wonderful task list application</strong>
        </div>
        {
          user ?
            <div>
              <div>You are authenticated with email: {user.email}</div>
              <div className="mt-3">
                <Link to="/tasks" className="btn btn-primary">View Tasks</Link>
              </div>
            </div>

            :
            <div>
              <div>You are not authenticated please register or login</div>
              <div className="mt-3">
                <Link to="/register" className="btn btn-primary me-3">Register</Link>
                <Link to="/login" className="btn btn-primary">Login</Link>
              </div>
            </div>
        }
      </div>
    )
  }
}
