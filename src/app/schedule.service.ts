import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { School } from './school';
import { Game } from './game';
import { HttpHeaders } from '@angular/common/http';
import { AddGameRequest } from './addGameRequest';
import { Conference } from './conference';
import { SuggestedGameResponse } from './suggestedGameResponse';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private baseUrl = "http://localhost:8080";
  private headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'})

  constructor(private http: HttpClient) { }

  getSchools(): Observable<School[]>{
    return this.http.get<School[]>(`${this.baseUrl}/schools`, {headers: this.headers} );
  }

  getSchoolByTgid(tgid: number): Observable<School>{
    return this.http.get<School>(`${this.baseUrl}/schools/${tgid}`);
  }

  // getSchoolByName(name: string): Observable<School>{
  //   return this.http.get<School>(`${this.baseUrl}/schools/${name}`);
  // }

  getSchoolSchedule(tgid: number): Observable<Game[]>{
    return this.http.get<Game[]>(`${this.baseUrl}/schools/${tgid}/schedule`);
  }

  getSchoolRivals(tgid: number): Observable<School[]>{
    return this.http.get<School[]>(`${this.baseUrl}/schools/${tgid}/rivals`);
  }

  async deleteGame(tgid: number, week: number): Promise<School>{
    return await this.http.delete<School>(`${this.baseUrl}/schools/${tgid}/week/${week}/remove-game`).toPromise();
  }

  async addGame(game: AddGameRequest): Promise<Game>{
    return this.http.post<Game>(`${this.baseUrl}/schedule/add-game`, game).toPromise();
  }

  getAvailableOpponents(tgid: number, week: number): Observable<School[]>{
    return this.http.get<School[]>(`${this.baseUrl}/schools/${tgid}/week/${week}/available-opponents`, {headers: this.headers} );
  }

  getEmptyWeeks(tgid: number): Observable<number[]>{
    return this.http.get<number[]>(`${this.baseUrl}/schools/${tgid}/empty-weeks`, {headers: this.headers} );
  }

  autoAddGames(): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/schedule/auto-add-games`, null, {headers: this.headers});
  }

  autoAddGamesAggressive(): Observable<any>{
    return this.http.put(`${this.baseUrl}/schedule/auto-add-games-aggressive`, null, {headers: this.headers})
  }

  fixSchedule(): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/schedule/fix`, null, {headers: this.headers});
  }

  removeAllOocGamesNonRivalry(): Observable<number>{
    return this.http.delete<number>(`${this.baseUrl}/schedule/remove-all-ooc-games-but-rivalry`);
  }

  removeAllOocGames(): Observable<number>{
    return this.http.delete<number>(`${this.baseUrl}/schedule/remove-all-ooc-games`);
  }

  removeAllFcsGames(): Observable<number>{
    return this.http.delete<number>(`${this.baseUrl}/schedule/remove-all-fcs-games`);
  }

  saveToFile(): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/schedule/save-to-file`, null);
  }

  getAllConferences(): Observable<Conference[]>{
    return this.http.get<Conference[]>(`${this.baseUrl}/conferences`, {headers: this.headers} );
  }

  getSchoolsByConference(name: string): Observable<School[]>{
    return this.http.get<School[]>(`${this.baseUrl}/conferences/${name}/schools`, {headers: this.headers} );
  }

  getSuggestedOpponent(tgid: number): Observable<SuggestedGameResponse>{
    return this.http.get<SuggestedGameResponse>(`${this.baseUrl}/schools/${tgid}/suggest-game`)
  }

  setScheduleFile(schedule: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', schedule);

    return this.http.post<HttpEvent<any>>(`${this.baseUrl}/schedule/set-by-file`, formData);
  }

  setAlignmentFile(alignment: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', alignment);

    return this.http.post<HttpEvent<any>>(`${this.baseUrl}/conferences/set-by-file`, formData);
  }

  saveScheduleToExcel(): Observable<any> {
    return this.http.get(`${this.baseUrl}/schedule/download`, {responseType: 'blob'} );
  }

}
