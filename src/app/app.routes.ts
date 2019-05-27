import { Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { ProfileComponent } from './profile/profile.component';
import { TeamComponent } from './team/team.component';

export const ROUTES: Routes = [
  { path: '',     component: ProfileComponent },
  { path: 'home', component: ProfileComponent },
  { path: 'list', component: ContainerComponent },
  { path: 'team', component: TeamComponent }
];
