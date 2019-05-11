import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Output() userIndexValue = new EventEmitter();
  @Output() genderValue = new EventEmitter();
  @Output() showAllEvent = new EventEmitter();
  @Input() users: any;
  @Input() showAll: boolean;

  constructor() { }

  ngOnInit() {
  }

  filterUser(index: any) {
    this.userIndexValue.emit(index);
  }

  filterUserByGender(gender: string) {
    this.genderValue.emit(gender);
  }

  showAllUsers() {
    this.showAllEvent.emit();
  }
}
