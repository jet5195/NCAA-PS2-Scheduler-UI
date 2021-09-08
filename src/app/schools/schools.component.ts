import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { School } from '../school';
import { MatExpansionModule } from '@angular/material/expansion';
import { Conference } from '../conference';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolsComponent implements OnInit {
  schools: School[] = [];
  selectedSchool?: School;
  panelOpenState = false;
  conferences: Conference[] = [];
  selectedConference?: Conference;

  // search attempt
  schools$!: Observable<School[]>;
  private searchTerms = new Subject<string>();
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    //search stuff
    // this.schools$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.scheduleService.searchSchools(term)),
    // );
    //
    this.scheduleService.getSchools().subscribe((data: School[]) => {
      console.log(data);
      this.schools = data;
    })
    this.scheduleService.getAllConferences().subscribe((data: Conference[]) => {
      console.log(data);
      this.conferences = data;
    })
  }

  onSelect(school: School): void {
    this.selectedSchool = school;
  }

}
