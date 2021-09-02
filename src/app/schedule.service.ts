import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { School } from './school';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private baseUrl = "http://localhost:8080/";
  private tgid = 112;
  private name = 'Samford';
  private headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'})

  constructor(private http: HttpClient) { }

  getSchools(): Observable<School[]>{
    return this.http.get<School[]>(`${this.baseUrl}allschools`, {headers: this.headers} );
  }

  getSchoolByTgid(): Observable<School>{
    return this.http.get<School>(`${this.baseUrl}searchSchoolByTgid/${this.tgid}`);
  }

  getSchoolByName(): Observable<School>{
    return this.http.get<School>(`${this.baseUrl}searchSchoolByName/${this.name}`);
  }
}
