import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/typings/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private pContador = new BehaviorSubject(0);
  contador = this.pContador.asObservable();

  constructor(private httpClient: HttpClient) { }

  getTodo(id): Observable<Todo> {
    return this.httpClient.get<Todo>(`http://localhost:3000/todos/${id}`);
  }

  deletetTodo(id): Observable<Todo> {
    return this.httpClient.delete<Todo>(`http://localhost:3000/todos/${id}`);
  }

  updateTodo(id, todo) {
    return this.httpClient.get(`http://localhost:3000/todos/${id}`, todo);
  }

  getTodos(userId): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`http://localhost:3000/users/${userId}/todos`);
  }

  adicionarTodo(todo: Todo) {
    return this.httpClient.post('http://localhost:3000/todos', todo);
  }

  aumentar() {
    this.pContador.next(this.pContador.value + 1);
  }

  diminuir() {
    this.pContador.next(this.pContador.value - 1);
  }
}
