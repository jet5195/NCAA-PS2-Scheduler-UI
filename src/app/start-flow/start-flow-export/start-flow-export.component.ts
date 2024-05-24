import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import * as fileSaver from 'file-saver';
import { DataService } from 'src/app/services/data.service';
import { CardOption } from '../start-flow.component';

@Component({
  selector: 'app-start-flow-export',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: `./start-flow-export.component.html`,
  styleUrl: './start-flow-export.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartFlowExportComponent implements OnInit {
  year: number;
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.getYear().subscribe((data) => {
      this.year = data;
    });
  }
  exportOptions: CardOption[] = [
    {
      title: 'Export Schedule',
      description: 'Export Schedule to import into NCAA 06',
      image: 'assets/NCAA_FOOTBALL_06_COVER_ART.jpg',
      action: () => this.exportSchedule(),
    },
    {
      title: 'Export Conference Alignment',
      description: 'Export Conference Alignment as XLSX file to use next time',
      image: 'assets/NCAA_NEXT_24_COVER_ART.jpg',
      action: () => this.exportConferenceAlignment(),
    },
  ];

  exportSchedule() {
    this.dataService.saveScheduleToExcel().subscribe((response: any) => {
      let blob: any = new Blob([response], {
        type: 'text/json; charset=utf-8',
      });
      const url = window.URL.createObjectURL(blob);
      fileSaver.saveAs(blob, this.year + '_new_sched.csv');
    }),
      (error: any) => console.log('Error downloading the Schedule'),
      () => console.info('Schedule downloaded successfully');
  }

  exportConferenceAlignment() {
    this.dataService.saveAlignmentToExcel().subscribe((response: any) => {
      let blob: any = new Blob([response], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fileSaver.saveAs(blob, 'ConferenceAlignment.xlsx');
    }),
      (error: any) => console.log('Error downloading Alignment'),
      () => console.info('Alignment downloaded successfully');
  }
}
