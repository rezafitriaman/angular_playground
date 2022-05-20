import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActiveTodo, InactiveTodo, Todo, Todos } from 'src/app/models/Todo';
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
            const inActiveTodosList = Object.values(todosFromFireBase)[1] as Array<InactiveTodo> ? Object.values(todosFromFireBase)[1] as Array<InactiveTodo> : [];

            Object.entries(activeTodosList).forEach((val: [string, ActiveTodo]) => {
                const name = val[0]; 
                const label = val[1].label
                const items = () => {
                    const target: Array<Todo> = [];
                    
                    if(val[1].items) {
                        const targetItems = Object.entries(val[1].items);

                        targetItems.forEach((val: [string, Todo]) => {
                            const name = val[0];
                            const content = val[1].content;
                            const completed = val[1].completed;
                            const editable = val[1].editable;

                            target.push(new Todo(content, completed, editable, name));
                        })
                    }
                    
                    return target;
                }

                todos.activeTodos.push(new ActiveTodo(label, items(), name))
            })
            
            Object.entries(inActiveTodosList).forEach((val: [string, InactiveTodo]) => {
                todos.inActiveTodos.push(new InactiveTodo(val[1].label, val[1].todo, val[1].name));
            })

            return todos;
        }));
    }

    postTodoItem(todo: Todo, todoId: string) {
        console.log('postTodos : ',todo);
        return this.http.post<Todo>(
            `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail/activeTodos/${todoId}/items.json`, todo
        );
    }

    postTodoList(todoMode: ActiveTodo | InactiveTodo, mode: string){
        console.log('postTodo list', );
        
        return this.http.post<ActiveTodo>(
            `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail/${mode}.json`, todoMode
        )
    }

    updateTodoContent(todoId: string, itemId:string, content: string) {
        console.log('updateTodoProp value');

        return this.http.patch<Todo>(
            `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail/activeTodos/${todoId}/items/${itemId}.json`, {'content': content}
        )
    }

    updateTodoOnComplete(todoId: string, itemId:string, value: boolean) {
        return this.http.patch<Todo>(
            `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail/activeTodos/${todoId}/items/${itemId}.json`, {'completed': value}
        )
    }

    deleteActiveTodo(todoId: string, itemId:string){
        return this.http.delete<null>(
            `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail/activeTodos/${todoId}/items/${itemId}.json`
        );
    }

    setToInactive(inActiveTodo: Record<string, InactiveTodo>){
        return this.http.patch<{string: InactiveTodo}>(
            `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail/inActiveTodos.json`, inActiveTodo
        )
    }

    deleteInActiveTodo(todoId: string){
        return this.http.delete<null>(
            `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail/inActiveTodos/${todoId}.json`
        );
    }

    setToActive(activeTodo: Record<string, ActiveTodo>, todoId: string) {
        return this.http.patch<any>(
            `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/fitriaman@gmail/activeTodos.json`, activeTodo
        )
    }
} 

// Firebase:
// GET - Reading Data
// - Data from your Realtime Database can be read by issuing an HTTP GET request to an endpoint. 
// The following example demonstrates how you might retrieve a user's name that you had previously stored in Realtime Database.
// PUT - Writing Data
// - You can write data with a PUT request.
// POST - Pushing Data
// - To accomplish the equivalent of the JavaScript push() method (see Lists of Data), you can issue a POST request.
// PATCH - Updating Data
// - You can update specific children at a location without overwriting existing data using a PATCH request.
// DELETE - Removing Data
// - You can delete data with a DELETE request