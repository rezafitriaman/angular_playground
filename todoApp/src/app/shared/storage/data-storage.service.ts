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
    
    // TODO fix this please, okey
    fetchTodos() {
        return this.http.get<Todos>(
            'https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail.json'
        ).pipe(map(todosFromFireBase => {
            const todos: Todos = {
                activeTodos: [],
                inActiveTodos: [],
            }

            const activeTodosList = Object.values(todosFromFireBase)[0] as Array<ActiveTodo>;

            Object.entries(activeTodosList).forEach((val: any) => {
                const id = val[0]; 
                const label = val[1].label
                const items: Array<Todo> = !val[1].items ? [] : Object.values(val[1].items);
                todos.activeTodos.push(new ActiveTodo(label, items, id))
            })


            return todos
        }));
    }
    // ? fix this
    postTodos(todo: Todo, todoId: string) {
        console.log('postTodos : ',todo);
        return this.http.post<any>(
            `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail/activeTodos/${todoId}/items.json`, todo
        );
    }
}

// "activeTodos": {
//     0: {
//         "label": "cadeau",
//         "items": {
//             0: {
//                 "content": "Blueberry",
//                 "completed": false,
//                 "editable": false
//             },
//             1: {
//                 "content": "Dragon fruit",
//                 "completed": false,
//                 "editable": false
//             },
//             2: {
//                 "content": "Apple",
//                 "completed": false,
//                 "editable": false
//             },
//             3: {
//                 "content": "Orange",
//                 "completed": false,
//                 "editable": false
//             }
//         }
//     }
// },
// "inActiveTodos": {
//     0: {
//         "label": "cadeau",
//         "todo": {
//             "content": "Tandenborstel",
//             "completed": false,
//             "editable": false
//         }
//     }
// }