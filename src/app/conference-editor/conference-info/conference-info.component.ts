import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Conference } from 'src/app/conference';
import { ConferenceEditorService } from '../conference-editor.service';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { NgIf } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';

@Component({
    selector: 'app-conference-info',
    templateUrl: './conference-info.component.html',
    styleUrl: './conference-info.component.css',
    standalone: true,
    imports: [
        FormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        NgIf,
        MatError,
        MatRadioGroup,
        MatRadioButton,
        MatCheckbox,
        MatSelect,
        MatOption,
    ],
})
export class ConferenceInfoComponent implements OnInit, AfterViewInit {
  conference: Conference;
  @ViewChild('conferenceInfoForm') conferenceInfoForm: NgForm;

  constructor(private conferenceEditorService: ConferenceEditorService) {}

  ngOnInit() {
    this.conferenceEditorService.selectedConference.subscribe(
      (conference: Conference) => {
        this.conference = conference;
      },
    );
  }

  ngAfterViewInit() {
    this.conferenceInfoForm.valueChanges.subscribe(() => {
      const isValid = this.conferenceInfoForm.valid;
      this.conferenceEditorService.updateInfoTabValidity(isValid);
    });
  }
}
