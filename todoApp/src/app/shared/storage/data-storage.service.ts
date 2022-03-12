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
            // let fetchedTodo = Object.values(todosFromFireBase);
            // console.log('fetchedTodo ----', todosFromFireBase);
            // console.log('fetchedTodo keys----', Object.keys(todosFromFireBase));
            // console.log('fetchedTodo value----', Object.values(todosFromFireBase));
            // console.log('fetchedTodo entries----', Object.entries(todosFromFireBase));
            // console.log('fetchedTodo---entry', Object.keys(fetchedTodo[0].activeTodos));
            // console.log('fetchedTodo---value', Object.values(fetchedTodo[0].activeTodos));
            // console.log('fetchedTodo---entries', Object.entries(fetchedTodo[0].activeTodos));
            const todos: Todos = {
                activeTodos: [],
                inActiveTodos: [],
            }

            const activeTodosList = Object.values(todosFromFireBase)[0] as Array<ActiveTodo>;
            console.log(Object.values(activeTodosList));
            Object.values(activeTodosList).forEach((val: ActiveTodo) => {
                const label = val.label
                const items: Array<Todo> = !val.items ? [] : Object.values(val.items);
                console.log('-----', !val.items ? [] : Object.values(val.items));
                todos.activeTodos.push(new ActiveTodo(label, items))
            })


            return todos
        }));
    }
    // ? fix this
    postTodos(todo: Todo, todoId: number) {
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