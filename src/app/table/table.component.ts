import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() filterList: any;

  constructor() { }

  ngOnInit() {
  }

  removeUser(userId: any) {
    console.log(userId);
  }

}
