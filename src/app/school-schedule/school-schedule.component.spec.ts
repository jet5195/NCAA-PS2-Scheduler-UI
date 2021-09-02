import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolScheduleComponent } from './school-schedule.component';

describe('SchoolScheduleComponent', () => {
  let component: SchoolScheduleComponent;
  let fixture: ComponentFixture<SchoolScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
