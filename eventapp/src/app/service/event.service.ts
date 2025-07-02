import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private Url = 'http://localhost:3333/api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get(this.Url);
  }

  addEvent(data: any): Observable<any> {
    return this.http.post(this.Url, data);
  }

  updateEvent(id: number, data: any): Observable<any> {
    return this.http.put(`${this.Url}/${id}`, data);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.Url}/${id}`);
  }
}
