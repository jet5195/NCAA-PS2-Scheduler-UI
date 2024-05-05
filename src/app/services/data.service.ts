import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AddGameRequest} from '../addGameRequest';
import {Bowl} from '../bowl';
import {Conference} from '../conference';
import {Game} from '../game';
import {School} from '../school';
import {SuggestedGameResponse} from '../suggestedGameResponse';

@Injectable()
export class DataService {

  private baseUrl = "http://localhost:8080";
  private headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'})

  constructor(private http: HttpClient) {
  }

  private selectedSchool?: School;

  setSelectedSchool(school: School | undefined) {
    this.selectedSchool = school;
  }

  getSelectedSchool(): School | undefined {
    return this.selectedSchool;
  }

  getScheduleByWeek(week: number) {
    return this.http.get<Game[]>(`${this.baseUrl}/schedule/week/${week}`, {headers: this.headers});
  }

  getSchools(): Observable<School[]> {
    return this.http.get<School[]>(`${this.baseUrl}/schools`, {headers: this.headers});
  }

  getSchoolByTgid(tgid: number): Observable<School> {
    return this.http.get<School>(`${this.baseUrl}/schools/${tgid}`);
  }

  // getSchoolByName(name: string): Observable<School>{
  //   return this.http.get<School>(`${this.baseUrl}/schools/${name}`);
  // }

  getSchoolSchedule(tgid: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.baseUrl}/schools/${tgid}/schedule`);
  }

  getSchoolRivals(tgid: number): Observable<School[]> {
    return this.http.get<School[]>(`${this.baseUrl}/schools/${tgid}/rivals`);
  }

  async deleteGame(tgid: number, week: number): Promise<School> {
    return await this.http.post<School>(`${this.baseUrl}/schools/${tgid}/schedule/week/${week}/remove-game`, null).toPromise();
  }

  async addGame(game: AddGameRequest): Promise<Game> {
    return this.http.post<Game>(`${this.baseUrl}/schedule/add-game`, game, {headers: this.headers}).toPromise();
  }

  getAvailableOpponents(tgid: number, week: number): Observable<School[]> {
    return this.http.get<School[]>(`${this.baseUrl}/schools/${tgid}/schedule/week/${week}/available-opponents`, {headers: this.headers});
  }

  getEmptyWeeks(tgid: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/schools/${tgid}/schedule/empty-weeks`, {headers: this.headers});
  }

  getEmptyWeeksTwoTeams(tgid: number, tgid2: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/schools/${tgid}/schedule/empty-weeks/${tgid2}`, {headers: this.headers});

  }

  autoAddGames(): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/schedule/auto-add-games`, null, {headers: this.headers});
  }

  autoAddGamesRandomly(): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/schedule/auto-add-games-random`, null, {headers: this.headers});
  }

  autoAddGamesRivals(): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/schedule/auto-add-games-rivals`, null, {headers: this.headers});
  }

  autoAddGamesAggressive(): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/schedule/auto-add-games-aggressive`, null, {headers: this.headers})
  }

  fixSchedule(): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/schedule/fix`, null, {headers: this.headers});
  }

  removeAllOocGamesNonRivalry(): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/schedule/remove-all-ooc-games-but-rivalry`, null);
  }

  removeAllOocGames(): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/schedule/remove-all-ooc-games`, null);
  }

  removeAllFcsGames(): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/schedule/remove-all-fcs-games`, null);
  }

  removeAllGames() {
    return this.http.post<number>(`${this.baseUrl}/schedule/remove-all-games`, null, {headers: this.headers});
  }

  saveToFile(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/schedule/save-to-file`, null);
  }

  getConferenceList(): Observable<Conference[]> {
    return this.http.get<Conference[]>(`${this.baseUrl}/conferences`, {headers: this.headers});
  }

  // getSchoolsByConference(name: string): Observable<School[]> {
  //   return this.http.get<School[]>(`${this.baseUrl}/conferences/${name}/schools`, { headers: this.headers });
  // }

  getSuggestedOpponent(tgid: number): Observable<SuggestedGameResponse> {
    return this.http.get<SuggestedGameResponse>(`${this.baseUrl}/schools/${tgid}/suggest-game`);
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

  setBowlFile(bowls: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', bowls);

    return this.http.post<HttpEvent<any>>(`${this.baseUrl}/bowls/set-by-file`, formData);
  }

  saveScheduleToExcel(): Observable<any> {
    return this.http.get(`${this.baseUrl}/schedule/download`, {responseType: 'blob'});
  }

  getYear(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/schedule/year`);
  }

  setYear(year: number) {
    return this.http.post<number>(`${this.baseUrl}/schedule/year/${year}`, null, {headers: this.headers});
  }

  getGame(week: number, gameNumber: number): Observable<Game> {
    return this.http.get<Game>(`${this.baseUrl}/schedule/week/${week}/${gameNumber}`);
  }

  saveGame(addGameRequest: AddGameRequest, week: number, gameNumber: number): Observable<any> {
    return this.http.post<Game>(`${this.baseUrl}/schedule/game/${week}/${gameNumber}`, addGameRequest, {headers: this.headers});
  }

  swapSchools(tgid1: number, tgid2: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/conferences/swap-schools/${tgid1}/${tgid2}`, {headers: this.headers});
  }

  renameConference(name: string, newName: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/conferences/${name}/rename/${newName}`, {headers: this.headers});
  }

  getSchoolsByDivision(name: string, division: number): Observable<School[]> {
    return this.http.get<School[]>(`${this.baseUrl}/conferences/${name}/division/${division}/schools`, {headers: this.headers});
  }

  saveSwapToExcel(): Observable<any> {
    return this.http.get(`${this.baseUrl}/conferences/download`, {responseType: 'blob'});
  }

  addConferenceGames(name: string) {
    return this.http.post<any>(`${this.baseUrl}/conferences/${name}/add-games`, {headers: this.headers});
  }

  removeConferenceGames(name: string) {
    return this.http.post<any>(`${this.baseUrl}/conferences/${name}/remove-games`, {headers: this.headers});
  }

  removeAllConferenceGames() {
    return this.http.post<any>(`${this.baseUrl}/schedule/remove-conference-games`, {headers: this.headers});
  }

  addAllConferenceGames() {
    return this.http.post<any>(`${this.baseUrl}/schedule/add-conference-games`, {headers: this.headers});
  }

  //global functions
  //returns true if conference setup is valid for scheduler handling conference scheduler
  isConferenceValid(conf: Conference): boolean {
    let isValid: boolean = true;
    if (conf.numOfSchools < 12 && conf.numOfSchools > 1) {
      return true;
    } else if (conf.numOfSchools == 12) {
      if (conf.divisions && conf.divisions.length == 2) {
        return true;
      } else isValid = false;
    } else if (conf.numOfSchools == 14) {
      if (conf.divisions && conf.divisions.length == 2) {
        if (conf.numOfConfGames == 8) {
          return true;
        } else isValid = false;
      } else isValid = false;
    } else isValid = false;
    console.log(conf.shortName + ' is invalid!');
    return isValid;
  }

  isConferenceListValid(conferences: Conference[]): boolean {
    let response: boolean = true;
    conferences.forEach((conf: Conference) => {
      if (conf.shortName.toLowerCase() !== 'independent' && conf.fbs && !this.isConferenceValid(conf)) {
        response = false;
      }
    })
    return response;
  }

  getBowlList(): Observable<Bowl[]> {
    return this.http.get<Bowl[]>(`${this.baseUrl}/bowls`, {headers: this.headers});
  }

  setBowlList(bowlList: Bowl[]): Observable<Bowl[]> {
    return this.http.put<any>(`${this.baseUrl}/bowls`, bowlList, {headers: this.headers});
  }

  swapSchedule(tgid1: number, tgid2: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/schedule/swap-schedule/${tgid1}/${tgid2}`, {headers: this.headers});
  }

  saveConferences(conferences: Conference[]): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/conferences`, conferences, {headers: this.headers});
  }

}
