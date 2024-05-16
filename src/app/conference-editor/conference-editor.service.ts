import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
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

  private schoolsValiditySubject = new BehaviorSubject<boolean>(true);
  private schoolsValidity = this.schoolsValiditySubject.asObservable();

  errors: string[] = [];

  constructor() {}

  updateSelectedConference(conference: Conference | null) {
    if (conference) {
      this.selectedConferenceSubject.next(conference);
      this.validateConferences();
    } else {
      //reset data;
      this.selectedConferenceSubject = new BehaviorSubject<Conference>(null);
      this.selectedConference = this.selectedConferenceSubject.asObservable();
    }
  }

  updateConferences(conferences: Conference[]) {
    this.conferencesSubject.next(conferences);
    this.errors = [];
    if (conferences) {
      this.validateConferences();
    }
  }

  validateConferences() {
    this.errors = [];
    this.conferences.pipe(take(1)).subscribe((conferences: Conference[]) => {
      conferences.forEach((c) => this.validateConference(c));
      this.verifyFbsSchoolCount(conferences);
    });
  }

  validateConference(conference: Conference) {
    if (conference.classification == 'FBS') {
      if (
        conference.divisions.length !== 0 &&
        conference.divisions.length !== 2
      ) {
        this.errors.push(
          conference.name + ': Only 0 or 2 divisions are allowed.',
        );
      }
      //orphaned schools validation
      if (conference.divisions.length == 2) {
        const divSchoolsFlatMap: School[] = conference.divisions.flatMap(
          (d) => d.schools,
        );
        if (conference.schools.length !== divSchoolsFlatMap.length) {
          this.errors.push(
            conference.name +
              ': has orphaned schools (Schools not in a division).',
          );
        }
        const schoolCounts = conference.divisions.map((d) => d.schools.length);
        const allEqual = schoolCounts.every(
          (count) => count === schoolCounts[0],
        );
        if (!allEqual) {
          this.errors.push(
            conference.name +
              ': divisions must have an equal numbers of schools.',
          );
        }
        if (conference.schools.length > 14) {
          this.errors.push(
            ': ' +
              conference.name +
              ' ' +
              conference.schools.length +
              ' conference size is not supported.',
          );
        }
      } else {
        //validations for schools without divisions
        if (conference.schools.length > 11) {
          this.errors.push(
            conference.name +
              ': conferences with > 11 schools must have divisions',
          );
        }
      }
    }
    if (this.errors.length > 0) {
      console.log(this.errors);
    }
  }

  updateInfoTabValidity(isValid: boolean) {
    this.infoTabValiditySubject.next(isValid);
  }

  updateSchoolsValidity(isValid: boolean) {
    this.schoolsValiditySubject.next(isValid);
  }

  // Single method to update all form validities
  updateFormValidities(infoValid: boolean, schoolListValid: boolean) {
    this.infoTabValiditySubject.next(infoValid);
    this.schoolsValiditySubject.next(schoolListValid);
  }

  isValid(): Observable<boolean> {
    return combineLatest([this.infoTabValidity, this.schoolsValidity]).pipe(
      map(
        ([infoFormValidity, schoolListValidity]) =>
          infoFormValidity && schoolListValidity,
      ),
    );
  }

  verifyFbsSchoolCount(conferences: Conference[]) {
    let totalFbsSchools = 0;
    conferences.forEach((conference) => {
      if (conference.classification === 'FBS') {
        totalFbsSchools += conference.schools.length;
      }
    });
    console.log(totalFbsSchools);
    if (totalFbsSchools >= 120) {
      this.errors.push('Must have 120 or fewer schools as FBS');
    }
  }
}
