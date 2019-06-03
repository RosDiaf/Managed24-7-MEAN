import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  editUserId: any;
  isDialogOpen: boolean;
  @Input() filterList: any;
  @Input() isSpinner: boolean;
  @Input() isUserId: string;
  @Output() removeUserFromList = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  removeUser(userId: any) {
    this.removeUserFromList.emit(userId);
  }

  openDialog(userId: any) {
    this.isDialogOpen = true;
    this.editUserId = userId;
  }
}
