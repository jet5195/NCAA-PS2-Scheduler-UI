import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Conference } from '../conference';
import { School } from '../school';

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

  errors: string[] = [];

  constructor() {}

  updateSelectedConference(conference: Conference) {
    this.selectedConferenceSubject.next(conference);
  }

  updateConferences(conferences: Conference[]) {
    this.conferencesSubject.next(conferences);
    this.errors = [];
    if (conferences) {
      conferences.forEach((c) => this.validateConference(c));
    }
  }

  validateConference(conference: Conference) {
    if (
      conference.divisions.length !== 0 &&
      conference.divisions.length !== 2
    ) {
      this.errors.push(
        conference.name + ': Only 0 or 2 divisions are allowed.'
      );
    }
    //orphaned schools validation
    if (conference.divisions.length == 2) {
      const divSchoolsFlatMap: School[] = conference.divisions.flatMap(
        (d) => d.schools
      );
      if (conference.schools.length !== divSchoolsFlatMap.length) {
        this.errors.push(
          conference.name +
            ': has orphaned schools (Schools not in a division).'
        );
      }
      const schoolCounts = conference.divisions.map((d) => d.schools.length);
      const allEqual = schoolCounts.every((count) => count === schoolCounts[0]);
      if (!allEqual) {
        this.errors.push(
          conference.name + ': divisions must have an equal numbers of schools.'
        );
      }
      if (conference.schools.length > 14) {
        this.errors.push +
          ': ' +
          conference.schools.length +
          ' conference size is not supported.';
      }
    } else {
      //validations for schools without divisions
      if (conference.schools.length > 11) {
        conference.name + ': conferences with > 11 schools must have divisions';
      }
    }
    console.log(this.errors);
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
