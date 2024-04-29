import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolsComponent } from './schools/schools.component';
import { SchoolScheduleComponent } from './school-schedule/school-schedule.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditConferencesComponent } from './edit-conferences/edit-conferences.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { PlayoffComponent } from './playoff/playoff.component';
import { PlayoffSchedulerComponent } from './playoff-scheduler/playoff-scheduler.component';
import { BowlsComponent } from './bowls/bowls.component';
import { ConferenceEditorComponent } from './conference-editor/conference-editor.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'schools/:conf', component: SchoolsComponent },
  { path: 'school/:tgid/schedule', component: SchoolScheduleComponent},
  { path: 'conferences', component: EditConferencesComponent},
  { path: 'schedule/:week', component: ScheduleComponent},
  { path: 'game/:week/:gameNumber', component: EditGameComponent},
  { path: 'playoffs', component: PlayoffComponent},
  { path: 'playoffs/:teamCount', component: PlayoffSchedulerComponent},
  { path: 'bowls', component: BowlsComponent},
  { path: 'custom-conferences', component: ConferenceEditorComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
