import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchoolsComponent } from './schools/schools.component';
import { SchoolScheduleComponent } from './school-schedule/school-schedule.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditConferencesComponent } from './edit-conferences/edit-conferences.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EditGameComponent } from './edit-game/edit-game.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'schools/:conf', component: SchoolsComponent },
  { path: 'school/:tgid/schedule', component: SchoolScheduleComponent},
  { path: 'conferences', component: EditConferencesComponent},
  { path: 'schedule/:week', component: ScheduleComponent},
  { path: 'game/:week/:gameNumber', component: EditGameComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
