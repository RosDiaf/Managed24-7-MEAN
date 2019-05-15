import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  employee: any;
  isServiceFail: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getEmployee()
      .subscribe(res => {
        this.employee = res;
        console.log(this.employee)
      }, (error) => {
        this.isServiceFail = true;
      });
  }
}
