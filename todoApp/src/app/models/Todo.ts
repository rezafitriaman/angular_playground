export class Todo {
  content: string;
  completed: boolean;
  id: string;

  constructor() {
    this.id = '';
    this.content = '';
    this.completed = false;
  }
}
