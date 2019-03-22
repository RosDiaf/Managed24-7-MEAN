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
  users: any;

  constructor(private formBuilder: FormBuilder,
              private dataService: DataService) {
    this.buildtermForm();
    this.dataService.getUsers()
      .subscribe(res => {
        this.users = res 
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
      this.users = res 
    }, (error) => {
      this.isServiceFail = true;
    });
  }
}
