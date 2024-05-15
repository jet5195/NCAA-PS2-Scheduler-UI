import {Component, OnInit} from '@angular/core';
import {Conference} from 'src/app/conference';
import {ConferenceEditorService} from '../conference-editor.service';

@Component({
  selector: 'app-conference-info',
  templateUrl: './conference-info.component.html',
  styleUrl: './conference-info.component.css',
})
export class ConferenceInfoComponent implements OnInit {
  conference: Conference;

  constructor(private conferenceEditorService: ConferenceEditorService) {
  }

  ngOnInit() {
    this.conferenceEditorService.selectedConference.subscribe(
      (conference: Conference) => {
        this.conference = conference;
      }
    );
  }
}
