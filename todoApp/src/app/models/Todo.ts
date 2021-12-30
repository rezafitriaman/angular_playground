export interface TodoPackage {
  page: string;
  items: Array<Todo>
}

export class Todo {
  content: string;
  completed: boolean;
  id: string;
  editable: boolean;

  constructor() {
    this.id = '';
    this.content = '';
    this.completed = false;
    this.editable = false;
  }
}
