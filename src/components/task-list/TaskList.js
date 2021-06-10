import React, { Component } from 'react'

import './TaskList.css';
import Firebase from '../../firebase/firebase';

import TaskForm from './TaskForm';
import TaskTable from './TaskTable';
import Task from '../../models/task';

const db = Firebase.instance().db;

export default class TaskList extends Component {

  constructor(props) {
    super(props);

    if (!this.props.user) {
      this.props.history.push('/login');
    }

    this.state = {
      tasks: [],
    }
  }

  async componentDidMount() {
    try {
      const { user } = this.props;
      const snapshot = await db.collection('tasks')
        .where('userId', '==', user.uid).get();
      const tasks = snapshot.docs.map(x => Task.fromFirebaseDocument(x));

      this.setState({ tasks });
    } catch (err) {
      console.log(err);
    }
  }

  async onTaskCreated(taskName) {
    try {
      const { user } = this.props;
      const task = Task.fromData(taskName, user.uid, false);

      const ref = await db.collection('tasks').add({
        userId: task.userId,
        name: task.name,
        completed: task.completed,
      });

      task.id = ref.id;
      const tasks = [...this.state.tasks, task];
      this.setState({ tasks });
    } catch (err) {
      console.log(err);
    }
  }

  async onTaskUpdated(task) {
    try {
      await db.collection('tasks').doc(task.id).update({
        name: task.name,
        completed: task.completed,
      });

      const updatedTasks = this.state.tasks.map(x =>
        x.id === task.id ? task : x
      );

      this.setState({
        tasks: updatedTasks
      });
    } catch (err) {
      console.log(err);
    }
  }

  async onTaskRemoved(task) {
    try {
      await db.collection('tasks').doc(task.id).delete();

      const updatedTasks = this.state.tasks.filter(x =>
        x.id !== task.id
      );

      this.setState({
        tasks: updatedTasks
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="container mt-3">
        <div className="card card-body">

          <h1 className="text-center">Todo List</h1>

          <hr />

          <p className="text-center">Our simple TODO list</p>

          <TaskForm createTask={(taskName) => this.onTaskCreated(taskName)} />

          <TaskTable
            tasks={this.state.tasks}
            updateTask={(task) => this.onTaskUpdated(task)}
            removeTask={(task) => this.onTaskRemoved(task)}
          />
        </div>
      </div>
    )
  }
}
