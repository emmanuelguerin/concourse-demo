import { TodoItem } from './TodoItem';

const API_ENDPOINT = '/api/todo';

export class TodoService {
    static listTodos(): Promise<TodoItem[]> {
        return fetch(API_ENDPOINT)
            .then(resp => resp.json())
            // tslint:disable-next-line:no-string-literal
            .then(json => json['_embedded'].todoItems)
            .catch(e => []);
    }

    static createTodo(text: string): Promise<TodoItem> {
        return fetch(
            API_ENDPOINT,
            {method: 'POST', body: `{ "text": "${text}" }`, headers: {'Content-type': 'application/json'}}
        )
            .then(resp => resp.json())
            .catch(e => null);
    }

    static completeTodo(id: number) {
        return fetch(
            `${API_ENDPOINT}/${id}`,
            {method: 'PATCH', body: '{ "done": true }', headers: {'Content-type': 'application/json'}}
        )
            .then(resp => resp.json())
            .catch(e => null);
    }
}
