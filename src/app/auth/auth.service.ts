import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
const API_KEY ='AIzaSyDZ5UxegLgrEKtK38s1gRvZYLIszSfxMNM'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pUser = new BehaviorSubject(null);
  currentUser = this.pUser.asObservable();
  constructor(private httpclient: HttpClient) { }
  login(email, password): Observable<any> {

    return this.httpclient.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`,{email,password})
  }
  createAccount(email, password): Observable<any>{
    return this.httpclient.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`,{email,password})
  }

  verifyToken(token): Observable<any> {
    return this.httpclient.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${API_KEY}`,{idToken:token})
  }
  setUser(user: any){
    this.pUser.next(user);
  }
  logout() {
    localStorage.removeItem('token');

   this.pUser.next({email:''});
   alert('usuario deslogado');

  }
}
