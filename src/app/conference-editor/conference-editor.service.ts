import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Conference } from '../conference';

@Injectable({
  providedIn: 'root'
})
export class ConferenceEditorService {
  private conferenceSource = new BehaviorSubject<Conference>(null);
  selectedConference = this.conferenceSource.asObservable();

  constructor() { }

  updateSelectedConference(conference: Conference) {
    this.conferenceSource.next(conference);
  }
}
