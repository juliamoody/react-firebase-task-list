import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import firebase from './firebase/firebase';

import Header from './components/header/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/task-list/TaskList';

import GuardedRoute from './components/routing/GuardedRoute';
import PropsRoute from './components/routing/PropsRoute';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loading: true
    };
    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }

  componentDidMount() {
    this.auth.onAuthStateChanged((user) => {
      this.setState({ user, loading: false });
    });
  }

  render() {
    const { user, loading } = this.state;

    return (
      <div>
        {
          loading ?
            <div>Loading</div>
            :
            <BrowserRouter>
              <Header user={user} />

              <div className="container mt-3">
                <PropsRoute path="/" exact component={Home} user={user} />
                <PropsRoute path="/login" exact component={Login} user={user} />
                <PropsRoute path="/register" exact component={Register} user={user} />

                <GuardedRoute path="/tasks" exact component={TaskList} user={user} />
              </div>
            </BrowserRouter>
        }
      </div>
    );
  }
}

export default App;
