import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Conference } from '../conference';

@Injectable({
  providedIn: 'root',
})
export class ConferenceEditorService {
  private selectedConferenceSubject = new BehaviorSubject<Conference>(null);
  selectedConference = this.selectedConferenceSubject.asObservable();

  private conferencesSubject = new BehaviorSubject<Conference[]>(null);
  conferences = this.conferencesSubject.asObservable();

  private infoTabValiditySubject = new BehaviorSubject<boolean>(true);
  private infoTabValidity = this.infoTabValiditySubject.asObservable();

  private schoolsTabValiditySubject = new BehaviorSubject<boolean>(true);
  private schoolsTabValidity = this.schoolsTabValiditySubject.asObservable();

  private divisionsTabValiditySubject = new BehaviorSubject<boolean>(true);
  private divisionsTabValidity =
    this.divisionsTabValiditySubject.asObservable();

  constructor() {}

  updateSelectedConference(conference: Conference) {
    this.selectedConferenceSubject.next(conference);
  }

  updateConferences(conferences: Conference[]) {
    this.conferencesSubject.next(conferences);
  }

  updateInfoTabValidity(isValid: boolean) {
    this.infoTabValiditySubject.next(isValid);
  }

  updateSchoolsTabValidity(isValid: boolean) {
    console.log('updating school list with: ' + isValid);
    this.schoolsTabValiditySubject.next(isValid);
  }

  // Single method to update all form validities
  updateFormValidities(infoValid: boolean, schoolListValid: boolean) {
    this.infoTabValiditySubject.next(infoValid);
    this.schoolsTabValiditySubject.next(schoolListValid);
  }

  isValid(): Observable<boolean> {
    return combineLatest([this.infoTabValidity, this.schoolsTabValidity]).pipe(
      map(
        ([infoFormValidity, schoolListValidity]) =>
          infoFormValidity && schoolListValidity
      )
    );
  }
}
