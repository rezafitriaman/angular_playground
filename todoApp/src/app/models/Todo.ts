export interface TodoPackage {
  label: string;
  items: Array<Todo>
}

export type InactiveTodo = Todo & {
  label: string
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
