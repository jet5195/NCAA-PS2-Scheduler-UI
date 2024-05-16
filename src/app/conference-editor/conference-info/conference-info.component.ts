import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Conference } from 'src/app/conference';
import { ConferenceEditorService } from '../conference-editor.service';

@Component({
  selector: 'app-conference-info',
  templateUrl: './conference-info.component.html',
  styleUrl: './conference-info.component.css',
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
