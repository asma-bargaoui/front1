import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from 'src/app/endPoints';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http: HttpClient) { }

  getAllFacture():Observable<any[]>{
    return this.http.get<any[]>(endpoint.factureEndpoint+"/all")
  }

  updateFacture(id: number):Observable<any>{
    return this.http.put(`${endpoint.factureEndpoint}/${id}/mark-as-paid`, {})
  }

}
