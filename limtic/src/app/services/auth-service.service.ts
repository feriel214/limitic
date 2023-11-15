import { Injectable } from '@angular/core';
import { HttpClient ,  HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = 'http://localhost:9000/api'; // Update with your API URL

  constructor(private http: HttpClient , private router: Router) { }

  signUp(user:any) {
    return this.http.post(`${this.apiUrl}/signup`,user);
  }

  signIn(user:any) {
    return this.http.post(`${this.apiUrl}/signin`,user);
  }

    // Helper function to get authorization headers with the token
    private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('token');
      if (token) {
        return new HttpHeaders({ Authorization: `Bearer ${token}` });
      } else {
        // Handle the case when the token is not available (user not authenticated)
        // You might want to redirect the user to the sign-in page or take appropriate action.
        // For simplicity, we'll just return an empty headers object here.
        return new HttpHeaders();
      }
    }
  
    // Example API request using the token for authentication
    getProtectedData() {
      const headers = this.getAuthHeaders();
      return this.http.get(`${this.apiUrl}/protected-resource`, { headers });
    }

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId')
      this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      return !!token; // Returns true if token exists, false otherwise
    }
}
