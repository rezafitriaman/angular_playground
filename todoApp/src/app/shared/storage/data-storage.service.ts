import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, take } from 'rxjs/operators';
import { ActiveTodo, InactiveTodo, Todo, Todos } from 'src/app/models/Todo';
import { TodoService } from 'src/app/todo.service';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { LoginOrJoinForm } from 'src/app/models/Todo';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { AuthResponseData } from 'src/app/models/Auth';

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    public loggedInInfo: Subject<boolean> = new Subject<boolean>();
    public thereIsError: Subject<string | null> = new Subject<string | null> ();
    public user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    constructor(private http: HttpClient, private todoService: TodoService) {};

    signInWithPassword(formValue: LoginOrJoinForm) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmfRwM7wb9RulolvYQraAVEmiwsh-Wi0A',
            {
                email: formValue.email,
                password: formValue.password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                console.log('object resData', resData);
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })    
        );
    }

    signUpWithPassword(formValue: LoginOrJoinForm) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmfRwM7wb9RulolvYQraAVEmiwsh-Wi0A',
            {
                email: formValue.email,
                password: formValue.password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                console.log('object resData', resData);
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    storeTodos() {
        return this.user.pipe(
            catchError(this.handleError),
            take(1),
            switchMap((user: User | null) => {
                let userToken = user?.token ? user.token : 'tokenIsInvallid'
                let userEmail = user?.email.split('.')[0];
                console.log('data storrage - user', user);
                const welComeTodo = {
                    activeTodos: [
                        {
                            "label": "Welcome",
                            "items": [],
                        }
                    ],
                    inActiveTodos: [],            
                }

                return this.http.put<Todos>(
                    `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/${userEmail}.json`, welComeTodo,
                    {
                        params: new HttpParams().set('auth', userToken)
                    }
                );
            }),
        );
    }
    
    fetchTodos() {
        return this.user.pipe(
            catchError(this.handleError),
            take(1),
            switchMap((user: User | null) => {
                let userToken = user?.token ? user.token : 'tokenIsInvallid';
                let userEmail = user?.email.split('.')[0];                    

                console.log('data storage - user', user);
                return this.http.get<Todos>(`https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/${userEmail}.json`, 
                {
                    params: new HttpParams().set('auth', userToken)
                })
            }),
            map(todosFromFireBase => {
                // Todo maybe rewhrite this with rxjs pluck
                const todos: Todos = {
                    activeTodos: [],
                    inActiveTodos: [],
                }
    
                if(!todosFromFireBase){
                    return todos;
                }
    
                const activeTodosList = Object.values(todosFromFireBase)[0] as Array<ActiveTodo>;
                const inActiveTodosList = Object.values(todosFromFireBase)[1] as Array<InactiveTodo> ? Object.values(todosFromFireBase)[1] as Array<InactiveTodo> : [];
    
                Object.entries(activeTodosList).forEach((val: [string, ActiveTodo]) => {
                    const activeTodo = {
                        get name() {
                            return val[0]; 
                        },
                        get label() {
                            return val[1].label;
                        },
                        get items() {
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
                    }
    
                    todos.activeTodos.push(new ActiveTodo(activeTodo.label, activeTodo.items, activeTodo.name));
                })
                
                Object.entries(inActiveTodosList).forEach((val: [string, InactiveTodo]) => {
                    todos.inActiveTodos.push(new InactiveTodo(val[1].label, val[1].todo, val[1].name));
                })
    
                return todos;
            })
        );
    }

    postTodoItem(todo: Todo, todoId: string) {
        return this.user.pipe(
            catchError(this.handleError),
            take(1),
            switchMap((user: User | null) => {
                let userToken = user?.token ? user.token : 'tokenIsInvallid'
                let userEmail = user?.email.split('.')[0];
                console.log('data storrage - user', user);
                return this.http.post<Todo>(
                    `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/${userEmail}/activeTodos/${todoId}/items.json`, todo, 
                    {
                        params: new HttpParams().set('auth', userToken)
                    }
                );
            }),
        );
    }

    setTodoListOnFireBase(todoMode: ActiveTodo | Record<string, ActiveTodo> | Record<string, InactiveTodo>, mode: 'activeTodos' | 'inActiveTodos', firebaseAPI: 'post' | 'patch' = 'post') {
        return this.user.pipe(
            catchError(this.handleError),
            take(1),
            switchMap((user: User | null) => {
                let userToken = user?.token ? user.token : 'tokenIsInvallid'
                let userEmail = user?.email.split('.')[0];
                console.log('data storrage - user', user);
                if (firebaseAPI === 'post') {
                    return this.http.post<{name: string}>(
                        `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/${userEmail}/${mode}.json`, todoMode, 
                        {
                            params: new HttpParams().set('auth', userToken)
                        }
                    )                                
                }

                return this.http.patch<{string: ActiveTodo}>(
                    `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/${userEmail}/${mode}.json`, todoMode,
                    {
                        params: new HttpParams().set('auth', userToken)
                    }
                )
            })
        );
    }

    deleteTodoList(todoId: string) {
        return this.user.pipe(
            catchError(this.handleError),
            take(1),
            switchMap((user: User | null) => {
                let userToken = user?.token ? user.token : 'tokenIsInvallid'
                let userEmail = user?.email.split('.')[0];

                return this.http.delete<null>(
                    `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/${userEmail}/activeTodos/${todoId}.json`,
                    {
                        params: new HttpParams().set('auth', userToken)
                    }
                )        
            })
        );
    }

    updateTodoContent(todoId: string, itemId:string, content: string) {
        return this.user.pipe(
            catchError(this.handleError),
            take(1),
            switchMap((user: User | null) => {
                let userToken = user?.token ? user.token : 'tokenIsInvallid';
                let userEmail = user?.email.split('.')[0];

                return this.http.patch<Todo>(
                    `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/${userEmail}/activeTodos/${todoId}/items/${itemId}.json`, {'content': content},
                    {
                        params: new HttpParams().set('auth', userToken)
                    }
                )        
            })
        )  
    }

    updateTodoOnComplete(todoId: string, itemId:string, value: boolean) {
        return this.user.pipe(
            catchError(this.handleError),
            take(1),
            switchMap((user: User | null) => {
                let userToken = user?.token ? user.token : 'tokenIsInvallid'
                let userEmail = user?.email.split('.')[0];
                
                return this.http.patch<Todo>(
                    `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/${userEmail}/activeTodos/${todoId}/items/${itemId}.json`, {'completed': value},
                    {
                        params: new HttpParams().set('auth', userToken)
                    }
                )
            })
        );
    }

    deleteActiveTodo(todoId: string, itemId:string) {
        return this.user.pipe(
            catchError(this.handleError),
            take(1),
            switchMap((user: User | null) => {
                let userToken = user?.token ? user.token : 'tokenIsInvallid';
                let userEmail = user?.email.split('.')[0];

                return this.http.delete<null>(
                    `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/${userEmail}/activeTodos/${todoId}/items/${itemId}.json`,
                    {
                        params: new HttpParams().set('auth', userToken)
                    }
                );
            })
        );
    }

    deleteInActiveTodo(todoId: string) {
        return this.user.pipe(
            catchError(this.handleError),
            take(1),
            switchMap((user: User | null) => {
                let userToken = user?.token ? user.token : 'tokenIsInvallid';
                let userEmail = user?.email.split('.')[0];

                return this.http.delete<null>(
                    `https://todoapp-1b1f3-default-rtdb.europe-west1.firebasedatabase.app/${userEmail}/inActiveTodos/${todoId}.json`,
                    {
                        params: new HttpParams().set('auth', userToken)
                    }
                );
            })
        );        
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        console.log('data storage - user', user );
        this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        console.log('errorRes', errorRes);

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);    
        }

        switch (errorRes.error.error.message) { //TODO 299
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account.';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password isgn-in is disabled for this project.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'There is no user record corresponding to this identifier';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.';
                break;
            case 'USER_DISABLED':
                errorMessage = 'The user account has been disabled by an administrator.';
                break;
            default:
                errorMessage = 'An unknown error occurred!';
                break;
        }

        return throwError(errorMessage);
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