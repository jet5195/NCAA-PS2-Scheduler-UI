import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Conference} from "../../conference";
import {FormBuilder, FormGroup} from "@angular/forms";
import { ConferenceEditorService } from '../conference-editor.service';

@Component({
  selector: 'app-conference-info',
  templateUrl: './conference-info.component.html',
  styleUrl: './conference-info.component.css'
})
export class ConferenceInfoComponent implements OnInit {
  conference: Conference;

  conferenceForm: FormGroup;

  constructor(private fb: FormBuilder, private conferenceEditorService: ConferenceEditorService) {
  }
  ngOnInit(): void {
    this.conferenceEditorService.selectedConference.subscribe(conference => {
      this.conference = conference;
      this.createFormGroup();
    });
  }

  createFormGroup(){
    this.conferenceForm = this.fb.group({
      conferenceId: [this.conference.conferenceID],
      name: [this.conference.name],
      shortName: [this.conference.shortName],
      abbreviation: [this.conference.abbreviation],
      fbs: [this.conference.fbs],
      numOfConfGames: [this.conference.numOfConfGames],
      confGamesStartWeek: [this.conference.confGamesStartWeek],
      powerConf: [this.conference.powerConf],
      logo: [this.conference.logo]
    });

    this.conferenceForm.valueChanges.subscribe(data => {
      this.conference = Object.assign(this.conference, this.conferenceForm.value);
    });
  }

}
