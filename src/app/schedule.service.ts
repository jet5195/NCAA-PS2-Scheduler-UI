import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { School } from './school';
import { Game } from './game';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private baseUrl = "http://localhost:8080/";
  // private tgid = 112;
  // private name = 'Samford';
  private headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'})

  constructor(private http: HttpClient) { }

  getSchools(): Observable<School[]>{
    return this.http.get<School[]>(`${this.baseUrl}allschools`, {headers: this.headers} );
  }

  getSchoolByTgid(tgid: number): Observable<School>{
    return this.http.get<School>(`${this.baseUrl}searchSchoolByTgid/${tgid}`);
  }

  getSchoolByName(name: string): Observable<School>{
    return this.http.get<School>(`${this.baseUrl}searchSchoolByName/${name}`);
  }

  getSchoolSchedule(tgid: number): Observable<Game[]>{
    return this.http.get<Game[]>(`${this.baseUrl}school/${tgid}/schedule`)
  }

  getSchoolRivals(tgid: number): Observable<School[]>{
    return this.http.get<School[]>(`${this.baseUrl}school/${tgid}/rivals`)
  }
}
