import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnuaireService {

  private apiUrl = 'http://localhost:9000/annuaire';

  constructor(private http: HttpClient) { }

  getAllAnnuaires(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getall`);
  }

  getAnnuaireById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addAnnuaire(annuaire: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addannuaire`, annuaire);
  }

  editAnnuaire(id: any, annuaire: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/edit/${id}`, annuaire);
  }

  deleteAnnuaire(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
