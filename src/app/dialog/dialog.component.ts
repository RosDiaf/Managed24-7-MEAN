import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, OnChanges {

  userProfile: any;
  @Input() isDialogOpen: boolean;
  @Input() editUserId: any;
  @Output() dialogStatus = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "editUserId" changed
    if (changes['editUserId']) {
      this.getSingleUser();
    }
  }

  getSingleUser() {
    this.dataService.getUsersById(this.editUserId)
    .subscribe(res => {
      this.userProfile = res;
    })
  }

  closeDialog() {
    this.dialogStatus.emit();
  }
}
