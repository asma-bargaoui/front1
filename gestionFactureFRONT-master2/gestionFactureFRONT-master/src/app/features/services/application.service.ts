import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from '../../endPoints';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  updateApplication(id: any, value: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getAllApplications(): Observable<any[]>{
    return this.http.get<any[]>(`${endpoint.applicationEndPoint}/getall`)
  }

  addNewApplication(application: any):Observable<any>{
    return this.http.post<any>(`${endpoint.applicationEndPoint}/createapp`, application)
  }

  deleteApplication(appId: number): Observable<any>{
    return this.http.delete<any>(`${endpoint.applicationEndPoint}/deleteapp/${appId}`)
  }

 // updateApplication(appId: number, newApp: any){
 //   return this.http.put<any>(`${endpoint.applicationEndPoint}/updateapp/${appId}`, newApp);
 // }
}
