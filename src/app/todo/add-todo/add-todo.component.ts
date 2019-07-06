import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/typings/Todo';
import { TodoService } from '../todo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  isEdit = false;
  email = '';
  todo: Todo = {
    id: null,
    title: '',
    description: '',
    finished: false,
    date: '',
    userId: '',
  };

  constructor(
    private todoService: TodoService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.isEdit = true;

        this.todoService.getTodo(params.id).subscribe((todo: Todo) => {
          this.todo = todo;
        });
      }
    });

    this.authService.currentUser.subscribe(user => {
      this.todo.userId = user.id;
    });
  }

  enviarTodo() {
    console.log(this.todo);

    if (!this.todo.id) {
      alert('Usuário invalido');
      this.router.navigateByUrl('auth/login');
    }

    if (this.isEdit) {
      this.todoService.updateTodo(this.todo.id, this.todo).subscribe(() => {
        alert('To-do atualizado com sucesso');
        this.router.navigateByUrl('/todos');
      });
    }

    this.todoService.adicionarTodo(this.todo).subscribe(() => {
      alert('To-do adicionado com sucesso');
      this.router.navigateByUrl('/todos');
    });
  }

}
