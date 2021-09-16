import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConferencesComponent } from './edit-conferences.component';

describe('EditConferencesComponent', () => {
  let component: EditConferencesComponent;
  let fixture: ComponentFixture<EditConferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
