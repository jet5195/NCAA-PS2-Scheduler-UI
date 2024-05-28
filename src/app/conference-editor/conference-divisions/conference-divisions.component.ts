import { Component, Input, OnInit } from '@angular/core';
import { Division } from 'src/app/division';
import { School } from 'src/app/school';
import { Conference } from '../../conference';
import { ConferenceEditorService } from '../conference-editor.service';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-conference-divisions',
    templateUrl: './conference-divisions.component.html',
    styleUrl: './conference-divisions.component.css',
    standalone: true,
    imports: [
        FormsModule,
        NgIf,
        NgFor,
        MatCard,
        MatCardContent,
        MatFormField,
        MatLabel,
        MatInput,
        MatError,
        MatButton,
    ],
})
export class ConferenceDivisionsComponent implements OnInit {
  conference: Conference;
  @Input() allDivisions: Division[];

  constructor(private conferenceEditorService: ConferenceEditorService) {}

  ngOnInit() {
    this.conferenceEditorService.selectedConference.subscribe(
      (conference: Conference) => {
        this.conference = conference;
      },
    );
  }

  removeDivision(index: number) {
    const div: Division = this.conference.divisions[index];
    div.schools.forEach((school: School) => {
      school.divisionId = null;
    });
    this.conference.divisions.splice(index, 1);
    this.conferenceEditorService.updateSelectedConference(this.conference);
  }

  addDivision() {
    const divisionId = this.findNewDivisionId();
    const newDivision: Division = {
      divisionId: divisionId,
      name: '',
      shortName: '',
      schools: [],
    };
    this.conference.divisions.push(newDivision);
    this.conferenceEditorService.updateSelectedConference(this.conference);
  }

  findNewDivisionId() {
    const divisionIds: number[] = this.allDivisions.map(
      (division) => division.divisionId,
    );
    const confDivisionIds: number[] = this.conference.divisions.map(
      (division) => division.divisionId,
    );

    divisionIds.push(...confDivisionIds);

    let newId = 0;
    while (divisionIds.includes(newId)) {
      newId++;
    }
    return newId;
  }
}
