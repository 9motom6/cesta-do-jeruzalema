import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Entry} from "./models";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rootUrl: string = '/api';

  constructor(private http: HttpClient) {
  }

  getEntries(): Observable<{ text: string, entries: Entry[] }> {
    return this.http.get(this.rootUrl + '/entries') as Observable<{ text: string, entries: Entry[] }>;
  }

  addEntry(): Observable<Object> {
    return this.http.post(this.rootUrl + "/entries/add", {name: "Horys"});
  }
}
