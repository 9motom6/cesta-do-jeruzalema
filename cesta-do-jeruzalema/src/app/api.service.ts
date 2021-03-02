import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rootUrl: string = '/api';

  constructor(private http: HttpClient) { }

  getTrackings() {
    return this.http.get(this.rootUrl + '/trackings');
  }
}
