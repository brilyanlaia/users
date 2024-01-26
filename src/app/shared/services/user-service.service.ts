import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetail, UserList } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getUserList() {
    return this.http.get<UserList[]>(`${this.baseUrl}/users`);
  }

  getUserById(id: number) {
    return this.http.get<UserDetail>(`${this.baseUrl}/users/${id}`);
  }
}
