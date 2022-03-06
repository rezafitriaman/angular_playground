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
            'https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail.json',
            {
                todos        
            }
        );
    }

    fetchTodos() {
        return this.http.get<Todos>(
            'https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail.json'
        ).pipe(map(todos => {
            console.log('fetch Todos', Object.values(todos));
            let fetchedTodo = Object.values(todos)
            console.log('activeTodos', fetchedTodo[0]);
            return fetchedTodo[0]
        }));
    }
    // ? fix this
    // postTodos(todo: ActiveTodo) {
    //     return this.http.post<Todo>(
    //         'https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail/activeTodos/0/items.json',
    //         {
                
    //                 completed: false,
    //                 content: 'vliegen',
    //                 editable: false,
                
    //         }
    //     );
    // }
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