import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from 'src/app/endPoints';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getConnectedAdmins() {
    throw new Error('Method not implemented.');
  }
  getConnectedUsers() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  saveNewUser(user: any): Observable<any>{
    return this.http.post<any>(`${endpoint.registerEndPoint}`, user)
  }

  getAllUsers():Observable<any[]>{
    return this.http.get<any[]>(`${endpoint.userEndpoint}/get`);
  }
  
  deleteUser(username: string): Observable<any>{
    return this.http.delete<any>(`${endpoint.userEndpoint}/delete/${username}`)
  }

  updateUser(user: any): Observable<any>{
    return this.http.put<any>(`${endpoint.userEndpoint}/update/${user.username}`, user);
  }
  searchUser(user:any): Observable<any>{
    return this.http.put<any>(`$endpoint.userEndpoint}/users/search/${user.username}`,user);
}
}
