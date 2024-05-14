import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchoolsComponent } from './schools/schools.component';
import { SchoolDetailComponent } from './school-detail/school-detail.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  SchoolScheduleComponent,
  SwapScheduleDialog,
} from './school-schedule/school-schedule.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddGameComponent } from './add-game/add-game.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditConferencesComponent } from './edit-conferences/edit-conferences.component';
import { ConferenceComponent } from './conference/conference.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { ScheduleComponent } from './schedule/schedule.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { MinutesAfterMidnightToTimePipe } from './pipes/minutesAfterMidnightToTime.pipe';
import { ConferenceNamePipe } from './pipes/conferenceName';
import { ConferenceLogoPipe } from './pipes/conferenceLogo';
import { DayOfWeekToStringPipe } from './pipes/dayOfWeekToString.pipe';
import { PlayoffComponent } from './playoff/playoff.component';
import { PlayoffSchedulerComponent } from './playoff-scheduler/playoff-scheduler.component';
import { BowlsComponent } from './bowls/bowls.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DataService } from './services/data.service';
import { ConferenceEditorComponent } from './conference-editor/conference-editor.component';
import { MatListModule } from '@angular/material/list';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatTabsModule } from '@angular/material/tabs';
import { MapComponent } from './conference-editor/map/map.component';
import { ConferenceSchoolListComponent } from './conference-editor/conference-school-list/conference-school-list.component';
import { AddSchoolDialogComponent } from './conference-editor/add-school-dialog/add-school-dialog.component';
import { ConferenceInfoComponent } from './conference-editor/conference-info/conference-info.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { ConferenceDivisionsComponent } from './conference-editor/conference-divisions/conference-divisions.component';
import { SchoolGridTileComponent } from './conference-editor/conference-school-list/school-grid-tile/school-grid-tile.component';
import { XdivRivalriesComponent } from './conference-editor/xdiv-rivalries/xdiv-rivalries.component';
import { LiteSchoolGridTileComponent } from './conference-editor/xdiv-rivalries/school-grid-tile-dense/lite-school-grid-tile.component';

@NgModule({
  declarations: [
    AppComponent,
    SchoolsComponent,
    SchoolDetailComponent,
    SchoolScheduleComponent,
    AddGameComponent,
    DashboardComponent,
    EditConferencesComponent,
    ConferenceComponent,
    ScheduleComponent,
    EditGameComponent,
    MinutesAfterMidnightToTimePipe,
    DayOfWeekToStringPipe,
    ConferenceNamePipe,
    ConferenceLogoPipe,
    PlayoffComponent,
    PlayoffSchedulerComponent,
    BowlsComponent,
    SwapScheduleDialog,
    ConferenceEditorComponent,
    MapComponent,
    ConferenceSchoolListComponent,
    AddSchoolDialogComponent,
    ConferenceInfoComponent,
    ConferenceDivisionsComponent,
    XdivRivalriesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatSliderModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTooltipModule,
    DragDropModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatListModule,
    MatTabsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    ReactiveFormsModule,
    MatCheckbox,
    SchoolGridTileComponent,
    LiteSchoolGridTileComponent,
  ],
  providers: [
    MinutesAfterMidnightToTimePipe,
    DayOfWeekToStringPipe,
    ConferenceNamePipe,
    ConferenceLogoPipe,
    DataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
