import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiUrl = environment.apiUrl;
  private accessToken = '555ed90c9528cf1779c79ce7ead9e46df40119ab1c4d1c96fbf368d527513ac1';

  constructor(private http:HttpClient) { }

  // Fetching data from database
  users()
  {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return this.http.get(this.apiUrl, { headers });
  }
  // Adding data to database
  saveUsers(data:any)
  {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.post(this.apiUrl, data, { headers })
  }

  // Get user details by ID
  getUserById(userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    // Construct the URL to fetch a specific user by their ID
    const userUrl = `${this.apiUrl}/${userId}`;

    return this.http.get(userUrl, { headers });
  }
}
