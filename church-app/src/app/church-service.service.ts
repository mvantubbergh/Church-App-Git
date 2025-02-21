import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChurchService {

  private baseUrl: string = 'http://localhost:8080/church/churchService';  // looks like I need to hardcode it for now

  constructor(private http: HttpClient) { }

  getChurchServices(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // create method in grails
  createChurchService(churchService: any): Observable<any> {
    return this.http.post(this.baseUrl, churchService);
  }

  // delete method in grails
  deleteChurchService(id: number, churchService: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, churchService);
  }

  // update / put method in grails
  updateChurchService(id: number, updatedService: any): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, updatedService);
  }

}
