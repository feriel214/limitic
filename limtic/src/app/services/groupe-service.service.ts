import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupeServiceService {

  private apiUrl = 'http://localhost:9000/group';

  constructor(private http: HttpClient) { }

  getAllGroupes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`);
  }

  getGroupeById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addGroupe(Groupe: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, Groupe);
  }

  editGroupe(id: any, Groupe: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${id}`, Groupe);
  }

  deleteGroupe(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

}
