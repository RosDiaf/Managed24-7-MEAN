import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  @Input() isDialogOpen: boolean;
  @Input() editUserId: any;
  @Output() dialogStatus = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogStatus.emit();
  }

}
