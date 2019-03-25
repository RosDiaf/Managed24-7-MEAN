import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  termForm: FormGroup;
  isSubmitted: boolean;
  isServiceFail: boolean;
  isSearchFail: boolean;
  users: any;
  filterList: any;
  showAll: boolean;

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService) {
    this.buildtermForm();
    this.dataService.getUsers()
      .subscribe(res => {
        this.users = res;
        this.filterList = res;
      }, (error) => {
        this.isServiceFail = true;
      });
  }

  ngOnInit() {
  }

  buildtermForm() {
    this.termForm = this.formBuilder.group({
      term: this.formBuilder.control(null, [Validators.required, Validators.pattern('^(?=[a-zA-Z])([A-Za-z]*)+$')]),
    });
  }

  onSubmit() {
    if (this.termForm.valid) {
      this.isSubmitted = true;
      this.getUsersByTerm(this.termForm.controls.term.value);
    }
  }

  getUsersByTerm(term) {
    this.dataService.getUsersByTerm(term)
    .subscribe(res => {
      if(res.lenght > 0) {
        this.users = res;
        this.filterList = res;
        this.isSearchFail = false;
      } else {
        this.isSearchFail = true;
      }
    }, (error) => {
      this.isServiceFail = true;
    });
  }

  filterUser(index: any) {
    this.filterList = [this.users[index]];
    this.showAll = true;
  }

  showAllUsers() {
    this.filterList = this.users;
    this.showAll = !this.showAll;
  }
}
