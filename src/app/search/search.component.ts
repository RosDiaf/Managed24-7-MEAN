import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  termForm: FormGroup;
  isSubmitted: boolean;
  @Output() termValue = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildtermForm();
  }

  buildtermForm() {
    this.termForm = this.formBuilder.group({
      term: this.formBuilder.control(null, [Validators.required, Validators.pattern('^(?=[a-zA-Z])([A-Za-z]*)+$')]),
    });
  }

  onSubmit() {
    if (this.termForm.valid) {
      this.isSubmitted = true;
      this.termValue.emit(this.termForm.controls.term.value);
    }
  }
}
