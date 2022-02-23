export interface TodoPackage {
    label: string
    items: Array<Todo>
}

export type InactiveTodo = Todo & {
    label: string
}

export class Todo {
    constructor(
        public content: string,
        public completed: boolean,
        public id: string,
        public editable: boolean
    ) {}
}

export class LoginOrJoinForm {
    constructor(public email: string, public password: string) {}
}
