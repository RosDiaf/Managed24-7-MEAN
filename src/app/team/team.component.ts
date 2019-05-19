import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ITeamMember } from './team.module'; 

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  employee: any;
  isServiceFail: boolean;
  teamMemberID: ITeamMember[] = [];
  clicked = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getEmployee()
      .subscribe(res => {
        this.employee = res;
      }, (error) => {
        this.isServiceFail = true;
      });
  }

  connect(memberID: string, i: number) {
    this.teamMemberID.push({id: memberID});
    this.clicked.push(i);
  }
}
