import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { MapComponent } from './map/map.component';
import { XdivRivalriesComponent } from './xdiv-rivalries/xdiv-rivalries.component';
import { ConferenceSchoolListComponent } from './conference-school-list/conference-school-list.component';
import { ConferenceDivisionsComponent } from './conference-divisions/conference-divisions.component';
import { ConferenceInfoComponent } from './conference-info/conference-info.component';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatOption } from '@angular/material/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'app-conference-editor',
    templateUrl: './conference-editor.component.html',
    styleUrls: ['./conference-editor.component.css'],
    standalone: true,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatButton,
        MatCardContent,
        MatFormField,
        MatLabel,
        MatSelect,
        FormsModule,
        NgFor,
        MatOption,
        NgIf,
        MatError,
        MatTabGroup,
        MatTab,
        ConferenceInfoComponent,
        ConferenceDivisionsComponent,
        ConferenceSchoolListComponent,
        XdivRivalriesComponent,
        MapComponent,
        AsyncPipe,
    ],
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
    this.conferenceEditorService.updateSelectedConference(
      this.selectedConference,
    );
  }
}
