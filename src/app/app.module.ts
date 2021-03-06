// -- Core
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';


// -- Components
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';

// -- Services
import { DataService } from './data.service';
import { SearchComponent } from './search/search.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { TableComponent } from './table/table.component';
import { TeamComponent } from './team/team.component';
import { ContainerComponent } from './container/container.component';
import { ProfileComponent } from './profile/profile.component';
import { DialogComponent } from './dialog/dialog.component';
import { SanitizerService } from './shared/sanitizer';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    FilterComponent,
    TableComponent,
    TeamComponent,
    ContainerComponent,
    ProfileComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
  ],
  providers: [DataService, SanitizerService],
  bootstrap: [AppComponent],
})
export class AppModule { }
