import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  termForm: FormGroup;
  isSubmitted: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.buildtermForm();
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
      console.log(this.termForm.controls.term.value)
    }
  }
}
