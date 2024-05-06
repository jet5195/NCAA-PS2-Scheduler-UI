import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-conference-info',
  templateUrl: './conference-info.component.html',
  styleUrl: './conference-info.component.css'
})
export class ConferenceInfoComponent {
  @Input() conferenceForm: FormGroup;

  constructor() {
  }
}
