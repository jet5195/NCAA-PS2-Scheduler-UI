import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Conference } from '../conference';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConferenceEditorService {
  private selectedConferenceSubject = new BehaviorSubject<Conference>(null);
  selectedConference = this.selectedConferenceSubject.asObservable();

  private infoFormValiditySubject = new BehaviorSubject<boolean>(true);
  private infoFormValidity = this.infoFormValiditySubject.asObservable();

  private schoolListValiditySubject = new BehaviorSubject<boolean>(true);
  private schoolListValidity = this.schoolListValiditySubject.asObservable();

  constructor() { }

  updateSelectedConference(conference: Conference) {
    this.selectedConferenceSubject.next(conference);
  }

  updateInfoFormValidity(isValid: boolean) {
    this.infoFormValiditySubject.next(isValid);
  }

  updateSchoolListValidity(isValid: boolean) {
    console.log('updating school list with: ' + isValid)
    this.schoolListValiditySubject.next(isValid);
  }

  // Single method to update all form validities
  updateFormValidities(infoValid: boolean, schoolListValid: boolean) {
    this.infoFormValiditySubject.next(infoValid);
    this.schoolListValiditySubject.next(schoolListValid);
  }

  isValid(): Observable<boolean> {
    return combineLatest([this.infoFormValidity, this.schoolListValidity]).pipe(
      map(([infoFormValidity, schoolListValidity]) => infoFormValidity && schoolListValidity)
    );
  }
}
