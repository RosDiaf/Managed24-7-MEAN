import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SanitizerService } from '../shared/sanitizer';
import { userFormProfileValues } from '../shared/user.form.values';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {

  userFormProfileValues: object = userFormProfileValues;
  userForm: FormGroup;
  isSubmitted: boolean;
  @Input() userProfile: any;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private sanitizerService: SanitizerService) {
    this.buildUserForm();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    const userProfile = 'userProfile';
    if (changes[userProfile]) {
      this.isSubmitted = false;
      const keyArr = ['title', 'name', 'surname', 'gender', 'role', 'industry'];
      this.userForm.controls[keyArr[0]].setValue(this.userProfile.title);
      this.userForm.controls[keyArr[1]].setValue(this.userProfile.name);
      this.userForm.controls[keyArr[2]].setValue(this.userProfile.surname);
      this.userForm.controls[keyArr[3]].setValue(this.userProfile.gender);
      this.userForm.controls[keyArr[4]].setValue(this.userProfile.role);
      this.userForm.controls[keyArr[5]].setValue(this.userProfile.industry);
    }
  }

  buildUserForm() {
    this.userForm = this.formBuilder.group({
      title: this.formBuilder.control(null, [Validators.required]),
      name: this.formBuilder.control(null, [Validators.required, Validators.pattern('^(?=[a-zA-Z ])([A-Za-z ]*)+$')]),
      surname: this.formBuilder.control(null, [Validators.required, Validators.pattern('^(?=[a-zA-Z ])([A-Za-z ]*)+$')]),
      gender: this.formBuilder.control(null, [Validators.required]),
      role: this.formBuilder.control(null, [Validators.required]),
      industry: this.formBuilder.control(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.sanitizeInputForm(this.userForm);
      const user = {
        title: this.userForm.controls.title.value,
        name: this.userForm.controls.name.value,
        surname: this.userForm.controls.surname.value,
        gender: this.userForm.controls.gender.value,
        role: this.userForm.controls.role.value,
        industry: this.userForm.controls.industry.value
      };
      this.isSubmitted = true;
      this.dataService.setUsers(user)
      .subscribe(
        data => {
           console.log(data);
        },
        (err: HttpErrorResponse) => {
            console.log(err.error);
            console.log(err.name);
            console.log(err.message);
            console.log(err.status);
            // this.isSubmitted = !this.isSubmitted;
        }
      );
    } else {
      this.isSubmitted = false;
    }
  }

  sanitizeInputForm(form) {
    const value = form.value;
    value.title = this.sanitizerService.sanitizeInput(value.title);
    value.name = this.sanitizerService.sanitizeInput(value.name);
    value.surname = this.sanitizerService.sanitizeInput(value.surname);
    value.gender = this.sanitizerService.sanitizeInput(value.gender);
    value.role = this.sanitizerService.sanitizeInput(value.role);
    value.industry = this.sanitizerService.sanitizeInput(value.industry);
  }

  reset() {
    this.userForm.reset();
    this.isSubmitted = !this.isSubmitted;
  }
}
