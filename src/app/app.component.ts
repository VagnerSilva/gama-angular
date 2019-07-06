import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo/todo.service';
import { map, debounceTime } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contador = 0;
  email = '';

  constructor(public todoService: TodoService, private authService: AuthService, private router: Router) {
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.setUser(null);
    this.router.navigateByUrl('/auth/login');
  }

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      this.authService.verifyToken(token).subscribe((v: any) => {

        this.authService.setUser({
          email: v.users[0].email,
          id: v.users[0].localId,
        });
      });
    }

    this.authService.currentUser.subscribe((v) => {
      if (v !== null) {
        this.email = v.email;
      } else {
        this.email = '';
      }
    });

    this.todoService.contador
      .pipe(
        map(x => x * 2),
        debounceTime(2000)
      )
      .subscribe(value => {
        this.contador = value;
      });
  }
}
