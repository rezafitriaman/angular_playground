export interface Todos {
    activeTodos: Array<ActiveTodo>;
    inActiveTodos: Array<InactiveTodo>;
}
export class Todo {
    constructor(public content: string, public completed: boolean, public editable: boolean) {}
}

export class ActiveTodo {
    constructor(public label: string, public items: Array<Todo>) {}
}

export class InactiveTodo {
    constructor(public label: string, public todo: Todo) {}
}
export class LoginOrJoinForm {
    constructor(public email: string, public password: string) {}
}
