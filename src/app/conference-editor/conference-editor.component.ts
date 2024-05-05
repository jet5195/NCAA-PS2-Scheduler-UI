import {Component, OnInit} from '@angular/core';
import {School} from '../school';
import {DataService} from '../services/data.service';
import {Conference} from '../conference';
import {SnackBarService} from '../snackBar.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {CompareService} from '../services/compare.service';

@Component({
  selector: 'app-conference-editor',
  templateUrl: './conference-editor.component.html',
  styleUrls: ['./conference-editor.component.css']
})
export class ConferenceEditorComponent implements OnInit {

  selectedSchool!: School;
  conferences: Conference[] = [];
  schools: School[] = [];
  selectedConference!: Conference;

  constructor(private dataService: DataService, private snackBarService: SnackBarService, public compareService: CompareService) {
  }

  ngOnInit() {
    this.loadData();
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
      tap(data => {
        this.conferences = data;
      })
    );
  }

  loadSchoolList() {
    this.dataService.getSchools().subscribe(data => {
      this.schools = data;
    });
  }

  /**
   * Saves the edited conference data using the DataService and displays a success or error message using the SnackBarService.
   */
  save() {
    this.dataService.saveConferences(this.conferences).subscribe(data => {
      console.log(data);
      this.snackBarService.openSnackBar('Conferences have been saved successfully', "Dismiss");
    }, (error: HttpErrorResponse) => {
      this.snackBarService.openSnackBar("Error saving conferences" + error.message, "Dismiss");
      console.error('Error status:', error.status);
      console.error('Error message:', error.message);
    });
  }

  /**
   * Reloads the original conference data by calling loadConferenceList() and updates the selected conference.
   */
  cancel() {
    this.loadConferenceList().subscribe(data => {
      const updatedConference = data.find(c => c.shortName === this.selectedConference.shortName);
      if (updatedConference) {
        this.conferenceUpdated(updatedConference);
      }
    });
  }

  /**
   * Updates the selected conference when it is edited.
   * @param conf The edited conference.
   */
  conferenceUpdated(conf: Conference) {
    this.selectedConference = {...conf};
  }
}
