export default class Task {
  constructor() {
    this.id = null;
    this.userId = null;
    this.name = null;
    this.completed = null;
  }

  static fromFirebaseDocument(doc) {
    const task = new Task();
    const data = doc.data();

    task.id = doc.id;
    task.userId = data.userId;
    task.name = data.name;
    task.completed = data.completed;
    return task;
  }

  static fromData(name, userId, completed) {
    const task = new Task();
    task.userId = userId;
    task.name = name;
    task.completed = completed;
    return task;


  }
}
