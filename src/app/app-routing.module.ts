import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrackerComponent } from './tracker/tracker.component';
import { TeamComponent } from './team/team.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  { path: '/', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tracker', component: TrackerComponent },
  { path: 'team', component: TeamComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'history/:uid', component: HistoryComponent},
  { path: 'profile/history/:uid', redirectTo: '/history/:uid', pathMatch: 'full'},
  { path: 'team/history/:uid', redirectTo: '/history/:uid', pathMatch: 'full'},
  { path: 'callback', component: CallbackComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
