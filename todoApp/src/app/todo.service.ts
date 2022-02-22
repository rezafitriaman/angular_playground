import {EventEmitter, Injectable} from '@angular/core';
import {InactiveTodo, Todo, TodoPackage} from "./models/Todo";
import {of, Subject} from "rxjs";

@Injectable({
	providedIn: 'root',
})
export class TodoService {
	public activeTodos: Array<TodoPackage>;
	public inActiveTodos: Array<InactiveTodo>;
	public activeTodosAdd: Subject<Array<TodoPackage>> = new Subject<
		Array<TodoPackage>
	>();
	public resetPlaceHolder: Subject<string> = new Subject<string>();
	public updateInActiveTodo: Subject<Array<InactiveTodo>> = new Subject<
		Array<InactiveTodo>
	>();
	public loading: Subject<boolean> = new Subject<boolean>();

	constructor() {
		this.activeTodos = [
			{
				label: 'cadeau',
				items: [
					{
						id: '13434639321192946',
						content: 'Dragon fruit',
						completed: false,
						editable: false,
					},
					{
						id: '1639321192946',
						content: 'apple',
						completed: false,
						editable: false,
					},
					{
						id: '33333',
						content: 'Orange',
						completed: false,
						editable: false,
					},
				],
			},
			{
				label: 'tv',
				items: [
					{
						id: '1639321192946',
						content: 'koffie',
						completed: false,
						editable: false,
					},
					{
						id: '33333',
						content: 'laptop',
						completed: false,
						editable: false,
					},
				],
			},
			{
				label: 'game',
				items: [],
			},
			{
				label: 'vliegen',
				items: [
					{
						id: '1639321192946',
						content: 'Tandenborstel',
						completed: false,
						editable: false,
					},
					{
						id: '33333',
						content: 'Tandenborstel',
						completed: false,
						editable: false,
					},
				],
			},
		];
		this.inActiveTodos = [
			{
				id: '33333',
				content: 'Tandenborstel',
				completed: false,
				editable: false,
				label: 'cadeau',
			},
		];
	}

	getActiveTodoItem(id: number) {
		return this.activeTodos[id].items;
	}

	getActiveTodos(): Array<TodoPackage> {
		return this.activeTodos.slice();
	}

	getInActiveTodos(): Array<InactiveTodo> {
		return this.inActiveTodos.slice();
	}

	onSetToInactive(indexItem: number, todoId: number) {
		this.inActiveTodos.push({
			...this.activeTodos[todoId].items[indexItem],
			label: this.activeTodos[todoId].label,
		});
		this.activeTodos[todoId].items.splice(indexItem, 1);
	}

	onSetToActive(todoId: number) {
		let labelIndex = this.activeTodos.findIndex(
			(target) => target.label === this.inActiveTodos[todoId].label
		);

		this.activeTodos[labelIndex].items.push({
			id: this.inActiveTodos[todoId].id,
			content: this.inActiveTodos[todoId].content,
			completed: false,
			editable: this.inActiveTodos[todoId].editable,
		});

		this.inActiveTodos.splice(todoId, 1);
		this.updateInActiveTodo.next(this.inActiveTodos);
	}

	onSetToComplete(indexItem: number, todoId: number) {
		this.activeTodos[todoId].items[indexItem].completed =
			!this.activeTodos[todoId].items[indexItem].completed;
	}

	onSetToEditable(indexItem: number, todoId: number, contentText: string) {
		if (this.activeTodos[todoId].items[indexItem].editable)
			this.activeTodos[todoId].items[indexItem].content = contentText;

		this.activeTodos[todoId].items[indexItem].editable =
			!this.activeTodos[todoId].items[indexItem].editable;

		return of(this.activeTodos[todoId].items[indexItem].editable);
	}

	addTodo(newTodo: TodoPackage) {
		this.activeTodos.push(newTodo);
		this.activeTodosAdd.next(this.activeTodos.slice());
	}

	addTodoItem(todoItem: Todo, todoId: number) {
		this.activeTodos[todoId].items.push(todoItem);
	}
}