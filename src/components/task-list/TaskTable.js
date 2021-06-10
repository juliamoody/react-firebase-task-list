import React, { Component } from 'react'

export default class TaskTable extends Component {

  completeTask(task) {
    task.completed = !task.completed;
    this.props.updateTask(task);
  }

  removeTask(task) {
    this.props.removeTask(task);
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Completed</th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            {
              this.props.tasks.map(task =>
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td onClick={() => this.completeTask(task)}>{
                    task.completed ?
                      <i className="pointer bi bi-circle-fill"></i> :
                      <i className="pointer bi bi-circle"></i>
                  }</td>
                  <td onClick={() => this.removeTask(task)}>
                    <i className="pointer bi bi-trash"></i>
                  </td>
                </tr>
              )
            }

          </tbody>
        </table>
      </div>
    )
  }
}
