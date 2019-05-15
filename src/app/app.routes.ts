import { Routes } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { TeamComponent } from './team/team.component';

export const ROUTES: Routes = [
  { path: '',     component: ContainerComponent },
  { path: 'home', component: ContainerComponent },
  { path: 'team', component: TeamComponent }
]
