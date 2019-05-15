import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  isSubmitted: boolean;
  isServiceFail: boolean;
  isSearchFail: boolean;
  users: any;
  employee: any;
  filterList: any;
  showAll: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getUsers()
    .subscribe(res => {
      this.users = res;
      this.filterList = res;
    }, (error) => {
      this.isServiceFail = true;
    });
  }

  getUsersByTerm(term) {
    this.dataService.getUsersByTerm(term)
    .subscribe(res => {
      if(res.length > 0) {
        this.users = res;
        this.filterList = res;
        this.isSearchFail = false;
      } else {
        this.isSearchFail = true;
      }
    }, (error) => {
      this.isServiceFail = true;
    });
  }

  filterUserByTitle(title: any) {
    this.filterList =  this.users.filter(item => {
      return item.title === title;
    });
    this.showAll = true;
  }

  filterUser(index: any) {
    this.filterList = [this.users[index]];
    this.showAll = true;
  }

  filterUserByGender(gender: string) {
    this.filterList =  this.users.filter(item => {
      return item.gender === gender;
    });
    this.showAll = true;
  }

  showAllUsers() {
    this.filterList = this.users;
    this.showAll = !this.showAll;
  }
}
