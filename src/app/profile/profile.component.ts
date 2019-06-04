import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userForm: FormGroup;
  isSubmitted: boolean;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.buildUserForm();
  }

  ngOnInit() {
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
        }
      );
    } else {
      this.isSubmitted = false;
    }
  }
}
