import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActiveTodo, Todo, Todos } from 'src/app/models/Todo';
import { TodoService } from 'src/app/todo.service';

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    constructor(private http: HttpClient, private todoService: TodoService) {}

    storeTodos() {
        const todos = this.todoService.getTodos();

        return this.http.put<Todos>(
            'https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail.json', todos
        );
    }
    
    fetchTodos() {
        return this.http.get<Todos>(
            'https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail.json'
        ).pipe(map(todosFromFireBase => {
            const todos: Todos = {
                activeTodos: [],
                inActiveTodos: [],
            }

            const activeTodosList = Object.values(todosFromFireBase)[0] as Array<ActiveTodo>;

            Object.entries(activeTodosList).forEach( (val: [string, ActiveTodo]) => {
                const name = val[0]; 
                const label = val[1].label
                const items = function () {
                    const target: Array<Todo> = [];
                    
                    if(val[1].items) {
                        const targetItems = Object.entries(val[1].items);

                        targetItems.forEach((val: [string, Todo]) =>{
                            const name = val[0];
                            const content = val[1].content;
                            const completed = val[1].completed;
                            const editable = val[1].editable;

                            target.push(new Todo(content, completed, editable, name))
                        })
                    }
                    
                    return target;
                }

                todos.activeTodos.push(new ActiveTodo(label, items(), name))
            })

            return todos
        }));
    }

    postTodo(todo: Todo, todoId: string) {
        console.log('postTodos : ',todo);
        return this.http.post<Todo>(
            `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail/activeTodos/${todoId}/items.json`, todo
        );
    }

    postTodoList(newActiveTodo: ActiveTodo){
        console.log('postTodo list', );
        
        return this.http.post<ActiveTodo>(
            `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail/activeTodos.json`, newActiveTodo
        )
    }

    updateTodoPropValue(todoId: string, itemId:string, content: string) {
        console.log('updateTodoProp value');

        return this.http.patch<Todo>(
            `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail/activeTodos/${todoId}/items/${itemId}.json`, {'content': content}
        )
    }

}
