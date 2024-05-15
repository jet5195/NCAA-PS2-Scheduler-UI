import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Conference } from '../conference';
import { Division } from '../division';
import { School } from '../school';
import { CompareService } from '../services/compare.service';
import { DataService } from '../services/data.service';
import { SnackBarService } from '../snackBar.service';
import { ComponentCanDeactivate } from '../unsaved-changes.guard';
import { ConferenceEditorService } from './conference-editor.service';

@Component({
  selector: 'app-conference-editor',
  templateUrl: './conference-editor.component.html',
  styleUrls: ['./conference-editor.component.css'],
})
export class ConferenceEditorComponent
  implements OnInit, OnDestroy, ComponentCanDeactivate
{
  conferences: Conference[] = [];
  divisions: Division[] = [];
  schools: School[] = [];
  selectedConference!: Conference;
  isValid: boolean = true;
  private subscriptions = new Subscription();
  constructor(
    private dataService: DataService,
    private snackBarService: SnackBarService,
    public compareService: CompareService,
    public conferenceEditorService: ConferenceEditorService,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.conferenceEditorService.updateSelectedConference(null);
    this.conferenceEditorService.updateFormValidities(true, true);
  }

  ngOnInit() {
    this.loadData();
    this.subscriptions.add(
      this.conferenceEditorService.selectedConference.subscribe(
        (conference) => {
          this.selectedConference = conference;
        },
      ),
    );
    this.subscriptions.add(
      this.conferenceEditorService.isValid().subscribe((isValid) => {
        this.isValid = isValid;
      }),
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.isValid;
  }

  /**
   * Loads conference and school data from the DataService.
   */
  loadData() {
    this.loadConferenceList().subscribe();
    this.loadSchoolList();
  }

  loadConferenceList(): Observable<Conference[]> {
    return this.dataService.getConferenceList().pipe(
      tap((data) => {
        this.conferences = data;
        // Use map and reduce to flatten the array of Division objects
        this.conferenceEditorService.updateConferences(this.conferences);
        this.divisions = this.conferences.flatMap(
          (conference) => conference.divisions,
        );
      }),
    );
  }

  loadSchoolList() {
    this.dataService.getSchools().subscribe((data) => {
      this.schools = data;
    });
  }

  /**
   * Saves the edited conference data using the DataService and displays a success or error message using the SnackBarService.
   */
  save() {
    this.dataService.saveConferences(this.conferences).subscribe(
      (data) => {
        console.log(data);
        this.snackBarService.openSnackBar(
          'Conferences have been saved successfully',
          'Dismiss',
        );
      },
      (error: HttpErrorResponse) => {
        this.snackBarService.openSnackBar(
          'Error saving conferences' + error.message,
          'Dismiss',
        );
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
      },
    );
  }

  /**
   * Reloads the original conference data by calling loadConferenceList() and updates the selected conference.
   */
  cancel() {
    this.loadConferenceList().subscribe((data) => {
      const updatedConference = data.find(
        (c) => c.conferenceId === this.selectedConference.conferenceId,
      );
      if (updatedConference) {
        this.conferenceEditorService.updateSelectedConference(
          updatedConference,
        );
      }
    });
    this.conferenceEditorService.updateFormValidities(true, true);
  }

  // Method to handle conference selection change
  onConferenceSelectChange(event) {
    // const selectedConf = event.value;
    this.conferenceEditorService.updateSelectedConference(
      this.selectedConference,
    );
  }

  getErrorMessage(errorKey: string) {
    if (errorKey === null) {
      return null;
    }
    switch (errorKey) {
      case 'required':
        return 'Please select a conference.';
      case 'invalid': // Handle other validation errors as needed
        return 'Invalid conference selection.';
      case 'invalidDivisionsLength':
        return 'Only 0 or 2 divisions are allowed.';
      case 'invalidDivisionsSchools':
        return 'Each division must have the same number of schools.';
      default:
        return JSON.stringify(errorKey);
    }
  }
}

// Custom validator functions
export const divisionsValidator: ValidatorFn = (
  formGroup: FormGroup,
): ValidationErrors | null => {
  const divisions: FormArray = formGroup.get('divisions') as FormArray;
  const isValid: boolean = divisions.length === 0 || divisions.length === 2;
  return isValid ? null : { invalidDivisionsLength: true };
};

// Custom validator functions
export const divisionsSchoolsValidator: ValidatorFn = (
  formGroup: FormGroup,
): ValidationErrors | null => {
  const divisions: FormArray = formGroup.get('divisions') as FormArray;
  if (divisions.length > 1) {
    const schools: FormArray = divisions.at(0).get('schools') as FormArray;
    const schools2: FormArray = divisions.at(1).get('schools') as FormArray;
    const isValid: boolean = schools.length === schools2.length;
    return isValid ? null : { invalidDivisionsSchools: true };
  } else return null;
};
