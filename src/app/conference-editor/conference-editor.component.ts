import { Component, OnInit } from '@angular/core';
import { School } from '../school';
import { DataService } from '../data.service';
import { Conference } from '../conference';

@Component({
  selector: 'app-conference-editor',
  standalone: false,
  templateUrl: './conference-editor.component.html',
  styleUrl: './conference-editor.component.css'
})
export class ConferenceEditorComponent implements OnInit {

  constructor(private dataService: DataService){
    
  }

  selectedSchool!: School;
  conferences: Conference[] = [];
  schools: School[] = [];
  selectedConference!: Conference;

  ngOnInit(){
    this.dataService.getConferenceList().subscribe(data => {
      this.conferences = data;
    });

    this.dataService.getSchools().subscribe(data => {
      this.schools = data;
    });
  }
}
