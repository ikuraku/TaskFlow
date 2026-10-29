import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../features/users/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly id = Math.random().toString(36).slice(2, 8);

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

  constructor() {
    console.log('UserService créé, id =', this.id);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
