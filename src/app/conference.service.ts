import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8080/conference";
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

}
