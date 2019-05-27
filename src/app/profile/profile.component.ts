import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userForm: FormGroup;
  isSubmitted: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.buildUserForm();
  }

  ngOnInit() {
  }

  buildUserForm() {
    this.userForm = this.formBuilder.group({
      title: this.formBuilder.control(null, [Validators.required]),
      name: this.formBuilder.control(null, [Validators.required, Validators.pattern('^(?=[a-zA-Z])([A-Za-z]*)+$')]),
      gender: this.formBuilder.control(null, [Validators.required]),
      role: this.formBuilder.control(null, [Validators.required]),
      industry: this.formBuilder.control(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.isSubmitted = true;
      console.log(this.userForm.controls)
    } else {
      this.isSubmitted = false;
    }
  }
}
