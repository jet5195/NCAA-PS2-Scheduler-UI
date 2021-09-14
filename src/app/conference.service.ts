import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from './school';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  private selectedSchool?: School;

  setSelectedSchool(school: School | undefined){
    this.selectedSchool = school;
  }

  getSelectedSchool(): School | undefined {
    return this.selectedSchool;
  }

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8080/conferences";
  private headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'})

  swapSchools(tgid1: number, tgid2: number): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/swap-schools/${tgid1}/${tgid2}`, {headers: this.headers} );
  }

  renameConference(name: string, newName: string): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${name}/rename/${newName}`, {headers: this.headers} );
  }

  renameDivision(name: string, divisionName: string, newName: string): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/${name}/division/${divisionName}/rename/${newName}`, {headers: this.headers} );
  }

  getSchoolsByDivision(name: string, division: string): Observable<School[]>{
    return this.http.get<School[]>(`${this.baseUrl}/${name}/division/${division}/schools`, {headers: this.headers} );
  }

}
