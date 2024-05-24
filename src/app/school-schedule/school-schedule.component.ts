import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AddGameRequest } from '../addGameRequest';
import { Conference } from '../conference';
import { Game } from '../game';
import { DayOfWeekToStringPipe } from '../pipes/dayOfWeekToString.pipe';
import { MinutesAfterMidnightToTimePipe } from '../pipes/minutesAfterMidnightToTime.pipe';
import { School } from '../school';
import { CompareService } from '../services/compare.service';
import { DataService } from '../services/data.service';
import { SnackBarService } from '../snackBar.service';
import { SuggestedGameResponse } from '../suggestedGameResponse';

@Component({
  selector: 'app-school-schedule',
  templateUrl: './school-schedule.component.html',
  styleUrls: ['./school-schedule.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'),
      ),
    ]),
  ],
  standalone: true,
  imports: [
    NgIf,
    MatButton,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    RouterLink,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    MatFormField,
    MatLabel,
    MatSelect,
    FormsModule,
    NgFor,
    MatOption,
    MatRadioGroup,
    MatRadioButton,
    MinutesAfterMidnightToTimePipe,
    DayOfWeekToStringPipe,
  ],
})
// @Injectable({
//   providedIn: 'root' // just before your class
// })
export class SchoolScheduleComponent implements OnInit {
  school!: School;
  clickedRow?: Game;
  suggestedGame?: SuggestedGameResponse;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  schedule: Game[] = [];
  activatedRoute = new ActivatedRoute();
  tgid!: number;
  conferences: Conference[] = [];
  selectedOpponent!: School;
  selectedWeek!: number;
  availableOpponents: School[] = [];
  availableWeeks: number[] = [];
  isHomeTeam!: boolean;

  displayedColumns: string[] = [
    'game',
    'week',
    'opponent',
    'time',
    'day',
    'conferenceGame',
    'result',
  ];
  dataSource = new MatTableDataSource(this.schedule);
  expandedGame: Game | null | undefined;

  constructor(
    private dataService: DataService,
    private snackBarService: SnackBarService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public compareService: CompareService,
  ) {}

  async add() {
    if (this.isHomeTeam === true) {
      const addGameRequest: AddGameRequest = {
        homeId: this.tgid,
        awayId: this.selectedOpponent.tgid,
        week: this.selectedWeek,
      };
      await this.dataService.addGame(addGameRequest);
    } else if (this.isHomeTeam === false) {
      const addGameRequest: AddGameRequest = {
        homeId: this.selectedOpponent.tgid,
        awayId: this.tgid,
        week: this.selectedWeek,
      };
      await this.dataService.addGame(addGameRequest);
    }
    this.setData();
    this.setAddGameData();
  }

  async delete(game: Game) {
    this.schedule = this.schedule.filter((g) => g !== game);
    await this.dataService.deleteGame(this.school.tgid, game.week);
    this.setData();
    this.setAddGameData();
  }

  changeWeek(): void {
    this.dataService
      .getAvailableOpponents(this.tgid, this.selectedWeek)
      .subscribe((data: School[]) => {
        console.log(data);
        this.availableOpponents = data;
      });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.setData();
      this.setAddGameData();
    });
    this.dataService.getConferenceList().subscribe((data) => {
      this.conferences = data;
    });
  }

  setData(): void {
    const tgid = parseInt(this.route.snapshot.paramMap.get('tgid')!, 10);
    this.dataService.getSchoolByTgid(tgid).subscribe((data: School) => {
      console.log(data);
      this.school = data;
    });
    this.loadSchoolSchedule(tgid);
  }

  loadSchoolSchedule(tgid: number): void {
    this.dataService.getSchoolSchedule(tgid).subscribe((data: Game[]) => {
      console.log(data);
      this.schedule = data;
      this.dataSource = new MatTableDataSource(this.schedule);
      this.dataSource.sort = this.sort;
    });
  }

  setAddGameData(): void {
    this.tgid = parseInt(this.route.snapshot.paramMap.get('tgid')!, 10);
    this.dataService.getEmptyWeeks(this.tgid).subscribe((data: number[]) => {
      console.log(data);
      this.availableWeeks = data;
    });
  }

  getSuggestedGame(): void {
    this.tgid = parseInt(this.route.snapshot.paramMap.get('tgid')!, 10);
    this.dataService
      .getSuggestedOpponent(this.tgid)
      .subscribe((data: SuggestedGameResponse) => {
        console.log(data);
        this.suggestedGame = data;
        if (this.suggestedGame !== null) {
          this.selectedWeek = this.suggestedGame.week;
          this.changeWeek();

          this.selectedOpponent = this.suggestedGame.opponent;
          this.isHomeTeam = this.suggestedGame.homeGame;
        } else {
          this.snackBarService.openSnackBar(
            'No suggested games found',
            'Dismiss',
          );
        }
      });
  }

  openScheduleSwapDialog(): void {
    const dialogRef = this.dialog.open(SwapScheduleDialog);

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result !== null) {
        this.dataService.swapSchedule(this.tgid, result).subscribe((data) => {
          console.log(data);
          this.loadSchoolSchedule(this.tgid);
        });
      }
    });
  }

  getConferenceNameById(conferenceId: number): string {
    const conf = this.conferences.find(
      (conf) => conf.conferenceId === conferenceId,
    );
    if (conf) {
      return conf.shortName;
    } else {
      return '';
    }
  }

  getDivisionNameById(divisionId: number): string {
    if (divisionId) {
      const divisions = this.conferences.flatMap((conf) => conf.divisions);
      const div = divisions.find((div) => div.divisionId === divisionId);
      if (div) {
        return div.shortName;
      }
    }
    return '';
  }
}

@Component({
  selector: 'swap-schedule-dialog',
  templateUrl: 'swap-schedule-dialog.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatSelect,
    FormsModule,
    NgFor,
    MatOption,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    NgIf,
  ],
})
export class SwapScheduleDialog {
  constructor(public dataService: DataService) {
    this.dataService.getSchools().subscribe((data: School[]) => {
      this.schoolList = data;
    });
  }

  schoolList!: School[];
  school2!: School;
}
