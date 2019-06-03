import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() isDialogOpen: boolean;
  @Input() editUserId: any;

  constructor() { }

  ngOnInit() {
  }

  closeDialog() {
    this.isDialogOpen = !this.isDialogOpen;
  }

}
