import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Conference} from "../../conference";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-conference-info',
  templateUrl: './conference-info.component.html',
  styleUrl: './conference-info.component.css'
})
export class ConferenceInfoComponent implements OnChanges {
  @Input() conference: Conference;

  conferenceForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges() {
    this.conferenceForm = this.fb.group({
      conferenceId: [this.conference.conferenceID],
      name: [this.conference.name],
      fbs: [this.conference.fbs],
      numOfConfGames: [this.conference.numOfConfGames],
      confGamesStartWeek: [this.conference.confGamesStartWeek],
      powerConf: [this.conference.powerConf],
      logo: [this.conference.logo]
    });
  }

}
