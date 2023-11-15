import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PubServiceService {

  private apiUrl = 'http://localhost:9000/pub';

  constructor(private http: HttpClient) { }

  getAllPubs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`);
  }

  getPubById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addPub(Pub: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addPublication`, Pub);
  }

  editPub(id: any, Pub: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${id}`, Pub);
  }

  deletePub(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
