import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-conference-info',
  templateUrl: './conference-info.component.html',
  styleUrl: './conference-info.component.css',
})
export class ConferenceInfoComponent {
  @Input() conferenceForm: FormGroup;

  constructor() {}

  get divisions(): FormArray {
    return this.conferenceForm.get('divisions') as FormArray;
  }
}
