import { Component, OnInit } from '@angular/core';
import { School } from '../school';
import { DataService } from '../data.service';
import { Conference } from '../conference';
import { SnackBarService } from '../snackBar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-conference-editor',
  standalone: false,
  templateUrl: './conference-editor.component.html',
  styleUrl: './conference-editor.component.css'
})
export class ConferenceEditorComponent implements OnInit {

  constructor(private dataService: DataService, private snackBarService: SnackBarService) {

  }

  selectedSchool!: School;
  conferences: Conference[] = [];
  schools: School[] = [];
  selectedConference!: Conference;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.dataService.getConferenceList().subscribe(data => {
      this.conferences = data;
    });

    this.dataService.getSchools().subscribe(data => {
      this.schools = data;
    });
  }

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
  cancel() {
    this.loadData();
    this.conferenceUpdated(this.selectedConference);
  }

  conferenceUpdated(conf: Conference) {
    this.selectedConference = { ...conf };
  }

  compareConferences(c1: Conference, c2: Conference): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }
  
}
