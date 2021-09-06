import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { School } from './school';
import { Game } from './game';
import { HttpHeaders } from '@angular/common/http';
import { AddGameRequest } from './addGameRequest';

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
    return this.http.get<Game[]>(`${this.baseUrl}school/${tgid}/schedule`);
  }

  getSchoolRivals(tgid: number): Observable<School[]>{
    return this.http.get<School[]>(`${this.baseUrl}school/${tgid}/rivals`);
  }

  async deleteGame(tgid: number, week: number): Promise<School>{
    return await this.http.delete<School>(`${this.baseUrl}school/${tgid}/removeGame/${week}`).toPromise();
  }

  async addGame(game: AddGameRequest): Promise<Game>{
    return this.http.post<Game>(`${this.baseUrl}addGame`, game).toPromise();
  }

  getAvailableOpponents(tgid: number, week: number): Observable<School[]>{
    return this.http.get<School[]>(`${this.baseUrl}school/${tgid}/availableOpponents/${week}`, {headers: this.headers} );
  }

  getEmptyWeeks(tgid: number): Observable<number[]>{
    return this.http.get<number[]>(`${this.baseUrl}school/${tgid}/findemptyweeks`, {headers: this.headers} );
  }

}
