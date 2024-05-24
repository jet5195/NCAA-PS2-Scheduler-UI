import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { DataService } from 'src/app/services/data.service';
import { SnackBarService } from 'src/app/snackBar.service';
import { CardOption, ScheduleType } from '../start-flow.component';

@Component({
  selector: 'app-start-flow-schedule',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTabsModule],
  templateUrl: './start-flow-schedule.component.html',
  styleUrl: './start-flow-schedule.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartFlowScheduleComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private snackBarService: SnackBarService,
    private cdRef: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    //check existing alignment, if we have data. Then enable edit button
    this.dataService.getSchedule().subscribe((data) => {
      if (data.length > 0) {
        this.isScheduleSet = true;
      }
    });
  }

  @ViewChild('tabs', { static: false }) matTabGroup: MatTabGroup;
  @ViewChild('scheduleFileInput') scheduleFileInput: any;
  isScheduleSet: boolean = false;
  scheduleImportOptions: CardOption[] = [
    {
      title: 'Import Schedule',
      description: 'Import Schedule from Preseason of Dynasty Mode',
      image: 'assets/SCHEDULE_IMPORT.png',
      action: () => this.triggerScheduleFileInput(),
    },
  ];

  scheduleOptions: CardOption[] = [
    {
      title: 'Automatically Update Schedule',
      description:
        'Removes all games, then schedules them again based on your Conference Alignment.',
      image: 'assets/NCAA_FOOTBALL_06_COVER_ART.jpg',
      type: ScheduleType.AUTOMATIC,
    },
    {
      title: 'Manually Edit Schedule',
      description: 'Manually update/edit the schedule.',
      image: 'assets/NCAA_FOOTBALL_06_COVER_ART.jpg',
      type: ScheduleType.MANUAL,
    },
  ];

  triggerScheduleFileInput() {
    this.scheduleFileInput.nativeElement.click();
  }

  setScheduleFile(file: File) {
    this.dataService.setScheduleFile(file).subscribe(
      (data: any) => {
        this.isScheduleSet = true;
        this.matTabGroup.selectedIndex = 1;
        this.cdRef.detectChanges();
        this.snackBarService.openSnackBar(
          'Schedule has been set successfully',
          'Dismiss',
        );
      },
      (error) => {
        this.snackBarService.openSnackBar(
          'Error setting schedule, try checking your file or exporting again',
          'Dismiss',
        );
      },
    );
  }

  importSchedule(fileInputEvent: any) {
    const file = fileInputEvent.target.files[0];
    this.setScheduleFile(file);
  }
}
