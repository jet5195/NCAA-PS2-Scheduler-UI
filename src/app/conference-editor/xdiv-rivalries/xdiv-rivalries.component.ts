import { Component, OnInit } from '@angular/core';
import { ConferenceEditorService } from '../conference-editor.service';
import { Conference } from 'src/app/conference';
import { School } from '../../school';

@Component({
  selector: 'app-xdiv-rivalries',
  templateUrl: './xdiv-rivalries.component.html',
  styleUrl: './xdiv-rivalries.component.css',
})
export class XdivRivalriesComponent implements OnInit {
  isXDivEnabled: boolean = false;
  conference!: Conference;

  constructor(private conferenceEditorService: ConferenceEditorService) {}

  ngOnInit(): void {
    this.conferenceEditorService.selectedConference.subscribe((conference) => {
      this.isXDivEnabled = false;
      this.conference = conference;
      if (this.conference.schools[0].xDivRival != null) {
        this.isXDivEnabled = true;
      }
    });
  }

  findSchoolByTgid(tgid: number): School | undefined {
    console.log(tgid);
    return this.conference.schools.find(
      (school: School) => school.tgid === tgid,
    );
  }
}
